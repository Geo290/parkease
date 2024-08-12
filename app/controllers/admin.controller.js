require('dotenv').config();

const adminModel = require('../models/admin.model.js');
const { sign } = require('jsonwebtoken');

const adminCtrl = {};

//Sign Up
adminCtrl.signup = async (req, res) => {
    const data = req.body;
    const { email } = req.body;

    const emailAlreadyExists = await adminModel.findOne({ email: email });
    if (emailAlreadyExists) {
        return res.status(409).json({ message: 'Email already exists!' })
    }

    try {
        const admin = new adminModel(data);
        admin.password = await admin.encryptPassword(admin.password);

        await admin.save();
        return res.status(200).json({ message: 'Signed Up successfully' });

    } catch {
        return res.status(500).json({ message: 'Error while signing up' });
    }
};

//LOGIN
adminCtrl.login = async (req, res) => {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
        return res.status(204).json({ message: 'No items found' });
    }

    const isValidPass = await admin.validatePassword(password);
    if (!isValidPass) {
        return res.status(401).json({
            message: 'Invalid password'
        });
    }

    const token = sign(
        {
            id: admin._id,
            email: admin.email,
            names: admin.names,
            lastnames: admin.lastnames,
            isAdmin: true
        },
        `${process.env.SECRET_JWT_KEY}`,
        {
            expiresIn: '1d'
        }
    );

    return res.status(200).json({ message: 'Successfully logged in', auth: true, token });
}

adminCtrl.logout = async (req, res) => {
    const { user } = req;
    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    return res.status(200).clearCookie('admin_access_token').json({ message: 'Logged out (not really)' });
}

//list
adminCtrl.listAll = async (req, res) => {
    const { user } = req;
    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    try {
        const resp = await adminModel.find();
        return res.status(200).json(resp)
    } catch {
        return res.status(500).json({ message: 'Failure!' });
    }
}

adminCtrl.updateAdmin = async (req, res) => {
    const { user } = req;
    const { email } = req.params;
    const data = req.body;

    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    const resp = await adminModel.findOne(email);
    if (!resp) {
        return res.status(204).json({ message: 'No items found' });
    }

    try {
        await resp.updateOne(data);
        return res.status(200).json({ message: 'Success!' });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Failure!' });
    }
}

//Delete
adminCtrl.deleteAdmin = async (req, res) => {
    const { user } = req;
    const { email } = req.params;

    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const resp = await adminModel.findOne(email);
    if (!resp) {
        return res.status(204).json({ message: 'No items found' });
    }

    try {
        await resp.deleteOne();
        return res.status(200).json({ message: "Success!" });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Failure!' });
    }
}


module.exports = adminCtrl;