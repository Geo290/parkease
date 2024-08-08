const { Router } = require('express');
const membershipCtrl = require("../controllers/membership.controller.js");
const verifyAdminToken = require('../middlewares/verifyAdminToken.js');
const verifyUserToken = require('../middlewares/verifyUserToken.js');

const router = Router();

router
    .post('/new/', verifyUserToken, membershipCtrl.createMembership)
    .get('/list', verifyAdminToken, membershipCtrl.getAllMemberships)
    .get('/list/by-email/:email?', verifyAdminToken, membershipCtrl.getMembership)
    .put('/update/:email?', verifyUserToken, membershipCtrl.updateMembership)
    .delete('/delete/:email?', verifyUserToken, membershipCtrl.deleteMembership);


// == == == THIS IS CALLED WHITE LIST == == ==
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// == == == == == == == == == == == == == == ==

module.exports = router;

