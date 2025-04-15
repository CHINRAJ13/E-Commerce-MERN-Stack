const cookie = require('cookie');

const sendToken = ( user, statusCode, res ) => {

    // Creating the token
    const token = user.getJwtToken();

    const serialized = cookie.serialize('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });
    
    res.setHeader('Set-Cookie', serialized);


    // setting cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME *24 *60 *60 *1000),
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    }

    res.status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token,
        user
    });
}

module.exports = sendToken;
