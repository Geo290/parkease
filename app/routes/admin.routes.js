const { Router } = require('express');
const adminCtrl = require('../controllers/admin.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router
    .post('/signup', adminCtrl.signup)
    .post('/login', adminCtrl.login)
    .get('/list', verifyToken)
    .put('/update/:id', verifyToken, adminCtrl.updateAdmin)
    .delete('/delete/:id', verifyToken, adminCtrl.deleteAdmin);

module.exports = router;