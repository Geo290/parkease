const express = require('express');
const router = express.Router();
const membershipCtrl = require("../controllers/food.controllers.js");


router.post('/', membershipCtrl.createMembership);
router.get('/', membershipCtrl.getAllMemberships);
router.get('/:id', membershipCtrl.getMembershipById);
router.put('/:id', membershipCtrl.updateMembershipById);
router.delete('/:id', membershipCtrl.deleteMembershipById);


// == == == THIS IS CALLED WHITE LIST == == ==
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// == == == == == == == == == == == == == == ==

module.exports = router;

