const { Router } = require('express');
const adminCtrl = require('../controllers/admin.controller');
const verifyAdminToken = require('../middlewares/verifyAdminToken');

const router = Router();

router
    .post('/signup', adminCtrl.signup)
    .post('/login', adminCtrl.login)
    .post('/logout', verifyAdminToken, adminCtrl.logout)
    .put('/update/:email?', verifyAdminToken, adminCtrl.updateAdmin)
    .delete('/delete/:email?', verifyAdminToken, adminCtrl.deleteAdmin)
    .get('/list', verifyAdminToken, adminCtrl.listAll);
    
module.exports = router;