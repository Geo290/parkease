const { Router } = require('express');
const membershipCtrl = require("../controllers/membership.controller.js");
const verifyToken = require('../middlewares/verifyToken.js');

const router = Router();

router
    .post('/new/', verifyToken, membershipCtrl.createMembership)
    .get('/list', verifyToken, membershipCtrl.getAllMemberships)
    .get('/list/by-id/:id', verifyToken, membershipCtrl.getAllMembershipById)
    .put('/update/:id', verifyToken, membershipCtrl.updateAllMembershipById)
    .delete('/delete/:id', verifyToken, membershipCtrl.deleteAllMembershipById)


// == == == THIS IS CALLED WHITE LIST == == ==
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// == == == == == == == == == == == == == == ==

module.exports = router;

