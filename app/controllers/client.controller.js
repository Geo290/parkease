const clientModel = require('../models/client.model.js');

const clientCtrl = {};

clientCtrl.signup = async (req, res) => {
    try {
        const data = req.body;
        const resp = await clientModel.create(data);
        return res.status(200).json({ message: 'Signed Up successfully' });
    } catch (error) {
        return res.status(500).jsn({ message: 'Error while signing up' });
    }
};

clientCtrl.login = async (req, res) => {
    try {
        const { email, password } = req.params;
        const client = await clientModel.findOne({ email: email });
        const isValidPass = await clientModel.validatePassword(password);

        if (!client) {
            return res.status(204).json({ message: 'No items found' });
        }
        if (!isValidPass) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        } 

        return res.status(200).json({ message: 'Successfully logged in'});

    } catch (error) {
        return res.status(500).json({ message: 'Error while logging in' });
    }
}

module.exports = clientCtrl;