const { verify } = require('jsonwebtoken');

const verifyUserToken = (req, res, next) => {
    const token = req.cookies.user_access_token;
    req.session = { user: null };

    try {
        const data = verify(token, process.env.SECRET_JWT_KEY);
        req.session.user = data;
    } catch {}

    next();
};

module.exports = verifyUserToken; // must import this middleware in routes files