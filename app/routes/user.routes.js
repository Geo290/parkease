const { Router } = require('express');
const userCtrl = require('../controllers/user.controller');
const verifyUserToken = require('../middlewares/verifyUserToken');

const router = Router();

router
    .post('/signup', userCtrl.signup)
    .post('/login', userCtrl.login)
    .post('/logout', verifyUserToken, userCtrl.logout)
    .put('/update/:email?', verifyUserToken, userCtrl.updateUser)
    .delete('/delete/:email?', verifyUserToken, userCtrl.deleteUser)
    .get('/list', verifyUserToken, userCtrl.listAll)
    .get('/logs', verifyUserToken, userCtrl.logs);
    .post('/logs', verifyUserToken, userCtrl.createLog);

module.exports = router;
