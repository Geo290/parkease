const membershipModel = require('../models/membership.model.js');

const membershipCtrl = {};

//Create 
membershipCtrl.createMembership = async (req, res) => {
    try {
        const { id, names, lastnames } = req.session.user;
        const membershipData = { 
            "client": { 
                "_id": id, 
                "names": names, 
                "lastnames": lastnames 
            }, 
            ...req.body 
        };

        const newMembership = new membershipModel(membershipData);
        await newMembership.save();

        return res.status(201).json({ message: "Membership created successfully"});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//Get all memberships
membershipCtrl.getAllMemberships = async (req, res) => {
    try {
        const memberships = await membershipModel.find();
        return res.status(200).json(memberships);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//Get a membership by ID
membershipCtrl.getAllMembershipById = async (req, res) => {
    try {
        const membership = await membershipModel.findById(req.params.id);
        if (!membership) return res.status(404).json({ message: 'Membership not found' });
        return res.status(200).json(membership);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//Update a membership by ID
membershipCtrl.updateAllMembershipById = async (req, res) => {
    try {
        const updateMembership = await membershipModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateMembership) return res.status(404).json({ message: 'Membership not found' });
        return res.status(200).json(updateMembership);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//Delete a membership by ID
membershipCtrl.deleteAllMembershipById = async (req, res) => {
    try {
        const deletedMembership = await membershipModel.findByIdAndDelete(req.params.id);
        if (!deletedMembership) return res.status(404).json({ message: 'Membership not found' });
        return res.status(200).json({ message: 'Membership deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = membershipCtrl;