require('dotenv').config();

const clientModel = require('../models/client.model.js');
const { sign } = require('jsonwebtoken');

const clientCtrl = {};

clientCtrl.signup = async (req, res) => {
    const data = req.body;
    const email = data.email;
    const emailAlreadyExits = await clientModel.findOne({ email: email });

    if (emailAlreadyExits) {
        return res.status(409).json({ message: "Email already exists" });
    }

    try {
        const client = new clientModel(data);
        client.password = await client.encryptPassword(client.password);
        await client.save();

        return res.status(200).json({ message: 'Signed Up successfully' });

    } catch {
        return res.status(500).json({ message: 'Error while signing up' });
    }
};

clientCtrl.login = async (req, res) => {
    const { email, password } = req.body;

    const client = await clientModel.findOne({ email: email });
    if (!client) {
        return res.status(204).json({ message: 'No items found' });
    }
    
    const isValidPass = await client.validatePassword(password);
    if (!isValidPass) {
        return res.status(401).json({
            message: 'Invalid password'
        });
    }

    const token = sign(
        {
            id: client._id,
            email: client.email,
            names: client.names,
            lastnames: client.lastnames
        },
        `${process.env.SECRET_JWT_KEY}`,
        {
            expiresIn: '1d'
        }
    );

    return res.status(200).json({ message: 'Successfully logged in', auth: true, token });
}

clientCtrl.logout = async (req, res) => {
    const { client } = req;
    if (!client) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(200).clearCookie('user_access_token').json({ message: 'Logged out (not really)' })
}

clientCtrl.protected = async (req, res) => {
    const { email, names, lastnames } = req.client;
    if (!email) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(200).json({ message: `Welcome ${names} ${lastnames}` });
}

module.exports = clientCtrl;