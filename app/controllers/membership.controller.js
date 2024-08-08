const membershipModel = require('../models/membership.model.js');

const membershipCtrl = {};

//Create 
membershipCtrl.createMembership = async (req, res) => {
    const { user } = req.session;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    };

    const { id, names, lastnames } = user;
    const membershipData = {
        "client": {
            "_id": id,
            "names": names,
            "lastnames": lastnames
        },
        ...req.body
    };

    try {
        const newMembership = new membershipModel(membershipData);
        await newMembership.save();

        return res.status(201).json({ message: "Success!" });
    } catch {
        return res.status(400).json({ message: 'Failure!'});
    }
}

//Get all memberships
membershipCtrl.getAllMemberships = async (req, res) => {
    const { admin } = req;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized" });
    };

    try{
        const memberships = await membershipModel.find();
        return res.status(200).json(memberships);
    } catch {
        return res.status(400).json({ message: 'Failure!'});
    }
}

//Get a membership by ID
membershipCtrl.getMembership = async (req, res) => {
    const { admin } = req;
    const { email } = req.params;

    if (!admin) {
        return res.status(401).json({ message: "Unauthorized" });
    };

    try {
        const resp = await membershipModel.findOne(email);
        return res.status(200).json(resp);
    } catch {
        return res.status(400).json({ message: 'Failure!'});
    }
}

//Update a membership by ID
membershipCtrl.updateMembership = async (req, res) => {
    const { user } = req;
    const { email } = req.params;
    const data = req.body;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    };
    
    const resp = await membershipModel.findOne(email);
    if (!resp) {
        return res.status(404).json({ message: 'No items found' })
    };

    try {
        await resp.updateOne(data);
        return res.status(200).json({ message: 'Success!'});  
    } catch {
        return res.status(400).json({ message: 'Failure!'});
    }
}

//Delete a membership by ID
membershipCtrl.deleteMembership = async (req, res) => {
    const { user } = req;
    const { email } = req.params;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    };

    const resp = await membershipModel.findOne(email);
    if (!resp) {
        return res.status(404).json({ message: 'No items found' })
    };

    try {
        await resp.deleteOne(email);
        return res.status(200).json({ message: 'Success!' });
    } catch {
        return res.status(500).json({ message: 'Failure!' });
    }
}

module.exports = membershipCtrl;