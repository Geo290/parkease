const { Router } = require('express');
const membershipCtrl = require("../controllers/membership.controller.js");
const verifyUserToken = require('../middlewares/verifyUserToken.js');

const router = Router();

router
    .post('/new/', verifyUserToken, membershipCtrl.createMembership)
    .get('/list', verifyUserToken, membershipCtrl.getAllMemberships)
    .get('/list/by-email/:email?', verifyUserToken, membershipCtrl.getMembership)
    .put('/update/:email?', verifyUserToken, membershipCtrl.updateMembership)
    .delete('/delete/:email?', verifyUserToken, membershipCtrl.deleteMembership);

router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = router;

