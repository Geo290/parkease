const { verify } = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['admin-access-token'];
    if (!token) {
        return res.status(401).json({ message: 'No authorizarion token' });
    }

    const data = verify(token, process.env.SECRET_JWT_KEY);
    req.admin = data;

    next();
};

module.exports = verifyAdminToken; // must import this middleware in routes files