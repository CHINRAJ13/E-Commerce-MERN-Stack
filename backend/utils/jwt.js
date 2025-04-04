const sendToken = ( user, statusCode, res ) => {

    // Creating the token
    const token = user.getJwtToken();

    // setting cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME *24 *60 *60 *1000),
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
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
