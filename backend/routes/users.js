var express = require('express');
var router = express.Router();
var User = require('./Models/userSchema');
var sendToken = require('../utils/jwt');
const { isAuthenticatedUser, authorizedUser } = require('../middleware/authenticate');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const { log } = require('console');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads/users'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
})

let BASE_URL = process.env.BACKEND_URL;
if (process.env.NODE_ENV === "production") {
  BASE_URL = `${req.protocol}://${req.get('host')}`
}

// Register new user - /users/register
router.post('/register', upload.single('avatar'), async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    let avatar;

    if (req.file) {
      avatar = `${BASE_URL}/uploads/users/${req.file.originalname}`
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        error: `This Email has already exists`
      });
    }

    user = await User.create({
      name, email, password, avatar
    });

    sendToken(user, 201, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// User Login - /users/login
router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password',
      });
    }
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid user or password',
      });
    }

    if (!await user.isValidPassword(password)) {
      return res.status(401).json({
        success: false,
        error: 'Invalid user or password',
      });
    }

    sendToken(user, 201, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// User Logout - /users/logout
router.get('/logout', isAuthenticatedUser, async function (req, res, next) {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })
      .status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// Forgot Password - /users/password/forgot
router.post('/password/forgot', async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const resetToken = user.getResetToken();
    await user.save({ validateBeforeSave: false });

    let BASE_URL = process.env.FRONTEND_URL;
    if (process.env.NODE_ENV === "production") {
      BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    // create reset url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;
    // console.log(resetUrl);


    const message = `Your Password reset url is as follows: \n\n 
    ${resetUrl} \n\n If you have not requested this email, ignore it.`;

    try {
      sendEmail({
        email: user.email,
        subject: 'MC Cart - Password Recovery',
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email has sent successfully to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// User reset password - /users/password/reset/:token
router.post('/password/reset/:token', async function (req, res, next) {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpire: {
        $gt: Date.now()
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Password reset token has invalid or expired',
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Password does not Match',
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save({ validateBeforeSave: false });

    sendToken(user, 201, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// Get user Profile - /users/myprofile
router.get('/myprofile', isAuthenticatedUser, async function (req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// Change password - /users/password/change
router.put('/password/change', isAuthenticatedUser, async function (req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // check the old password
    if (!await user.isValidPassword(req.body.oldPassword)) {
      return res.status(401).json({
        success: false,
        error: 'Password does not Match',
      });
    }

    // assigning new password
    user.password = req.body.password;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// User update profile - /users/myprofile/update
router.put('/myprofile/update', isAuthenticatedUser, upload.single('avatar'), async function (req, res, next) {
  try {
    let newUserData = {
      name: req.body.name,
      email: req.body.email
    }

    let avatar;
    if (req.file) {
      avatar = `${BASE_URL}/uploads/users/${req.file.originalname}`;
      newUserData = { ...newUserData, avatar }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// Admin = Get All users data - /users/admin/users
router.get('/admin/users', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next) {
  try {
    const users = await User.find();

    res.status(201).json({
      success: true,
      message: 'Users retrieved successfully',
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// Admin = Get Single user data - /users/admin/:id
router.get('/admin/:id', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User not found with ${req.params.id}`
      });
    }

    res.status(201).json({
      success: true,
      message: 'Users retrieved successfully',
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// Admin = Update user data - /users/admin/:id
router.put('/admin/:id', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next) {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    }

    // console.log(newUserData);
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true
    });
    // console.log(user);


    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// Admin = Delete user - /users/admin/:id
router.delete('/admin/:id', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);

    // if(!user){
    //   return res.status(404).json({
    //     success: false,
    //     message: `User not found with ${req.params.id}`
    //   });
    // }
    // await user.remove();

    res.status(200).json({
      success: true,
      message: `User deleted successfully`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
})

module.exports = router;
