const { verify } = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.admin_access_token;
    req.session = { admin: null };

    try {
        const data = verify(token, process.env.SECRET_JWT_KEY);
        req.session.admin = data;
    } catch {}

    next();
};  

module.exports = verifyAdminToken; // must import this middleware in routes files