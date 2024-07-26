const { verify } = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };

    try {
        const data = verify(token, process.env.SECRET_JWT_KEY);
        req.session.user = data;
    } catch (error) {
        console.error(error);
    }

    next();
};

module.exports = verifyToken; // must import this middleware in routes files