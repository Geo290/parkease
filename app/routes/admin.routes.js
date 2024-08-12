const { Router } = require('express');
const adminCtrl = require('../controllers/admin.controller');
const verifyUserToken = require('../middlewares/verifyUserToken');

const router = Router();

router
    .post('/signup', adminCtrl.signup)
    .post('/login', adminCtrl.login)
    .post('/logout', verifyUserToken, adminCtrl.logout)
    .put('/update/:email?', verifyUserToken, adminCtrl.updateAdmin)
    .delete('/delete/:email?', verifyUserToken, adminCtrl.deleteAdmin)
    .get('/list', verifyUserToken, adminCtrl.listAll);

router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = router;