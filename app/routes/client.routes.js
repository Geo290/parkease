const {Router} = require('express');
const clientCtrl = require('../controllers/client.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router
    .post("/signup", clientCtrl.signup)
    .post("/login", clientCtrl.login)
    .post("/logout", clientCtrl.logout)
    .get('/protected', verifyToken, clientCtrl.protected)

module.exports = router;