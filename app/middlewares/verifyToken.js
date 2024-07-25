const verifyToken = (req, res, next) => {
    const token = req.cookie.access_token;
    let data = null;

    req.session = { user: null };

    try {
        const data = verify(token, process.env.SECRET_JWT_KEY);
        req.session.user = { data };
    } catch { }

    next();
};

module.exports = verifyToken; // must import this middleware in routes files