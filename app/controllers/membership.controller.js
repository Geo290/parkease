const membershipModel = require('../models/membership.model.js');


const membershipCtrl = {};

//Create 
membershipCtrl.createMembership = async (req, res) => {
    try {
        const newMembership = new membershipModel(req.body);
        await newMembership.save();
        res.status(201).json(newMembership);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

//Get all memberships
membershipCtrl.getAllMemberships = async (req, res) => {
    try {
        const memberships = await membershipModel.find();
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

//Get a membership by ID
membershipCtrl.getAllMembershipById = async (req, res) => {
    try {
       const membership = await membershipModel.findById(req.params.id);
       if(!membership) return res.status(404).json({ message: 'Membership not found'});
       res.status(200).json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

//Update a membership by ID
membershipCtrl.updateAllMembershipById = async (req, res) => {
    try {
       const updateMembership = await membershipModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
       if(!updateMembership) return res.status(404).json({ message: 'Membership not found'});
       res.status(200).json(updateMembership);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

//Delete a membership by ID
membershipCtrl.deleteAllMembershipById = async (req, res) => {
    try {
      const deletedMembership = await membershipModel.findByIdAndDelete(req.params.id);
      if(!deletedMembership) return res.status(404).json({ message: 'Membership not found'});
      res.status(200).json({message: 'Membership deleted'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

module.exports = membershipCtrl;