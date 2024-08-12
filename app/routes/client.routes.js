const { Router } = require('express');
const clientCtrl = require('../controllers/client.controller');
const verifyUserToken = require('../middlewares/verifyUserToken');

const router = Router();

router
    .post("/signup", clientCtrl.signup)
    .post("/login", clientCtrl.login)
    .post("/logout", verifyUserToken, clientCtrl.logout)
    .get('/protected', verifyUserToken, clientCtrl.protected);

router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = router;