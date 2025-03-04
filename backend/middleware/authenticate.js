var User = require('../routes/Models/userSchema');
var jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Please login to access this resource'
            });
        }

        const decoded = jwt.verify( token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

exports.authorizedUser = (...roles) => async (req, res, next) => {
    try {
        if(!roles.includes(req.user.role)) {
            return  res.status(503).json({
                success: false,
                message: `Role: ${req.user.role} is not authorized to access this resource`
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}