require('dotenv').config();

const userModel = require('../models/user.model');
const logModel = require('../models/log.model');
const { sign } = require('jsonwebtoken');

const userCtrl = {};

//Sign Up
userCtrl.signup = async (req, res) => {
    const data = req.body;
    const { email } = req.body;

    const emailAlreadyExists = await userModel.findOne({ email: email });
    if (emailAlreadyExists) {
        return res.status(409).json({ message: 'Email already exists!' })
    }

    try {
        const user = new userModel(data);
        user.password = await user.encryptPassword(user.password);

        await user.save();
        return res.status(200).json({ message: 'Signed Up successfully' });

    } catch {
        return res.status(500).json({ message: 'Error while signing up' });
    }
};

//LOGIN
userCtrl.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(204).json({ message: 'No items found' });
    }

    const isValidPass = await user.validatePassword(password);
    if (!isValidPass) {
        return res.status(401).json({
            message: 'Invalid password'
        });
    }

    const token = sign(
        {
            id: user._id,
            email: user.email,
            names: user.names,
            lastnames: user.lastnames,
            isAdmin: user.isAdmin
        },
        `${process.env.SECRET_JWT_KEY}`,
        {
            expiresIn: '1d'
        }
    );

    const logData = {
        level: 'Info',
        message: `User ${user.email} logged in successfully`
    }
    const newLog = new logModel(logData);
    await newLog.save();

    return res.status(200).json({ message: 'Successfully logged in', auth: true, isAdmin:user.isAdmin, token });
}

userCtrl.logout = async (req, res) => {
    const { user } = req;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    const logData = {
        level: 'Info',
        message: `User ${user.email} logged out successfully`
    }
    const newLog = new logModel(logData);
    await newLog.save();

    return res.status(200).json({ message: 'Logged out' });
}

userCtrl.createNewAdmin = async (req, res) => {
    const { user } = req;
    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    const data = req.body;
    const { email } = req.body;

    const emailAlreadyExists = await userModel.findOne({ email: email });
    if (emailAlreadyExists) {
        return res.status(409).json({ message: 'Email already exists!' })
    }

    try {
        data.isAdmin = true;
        const userAdmin = new userModel(data);
        userAdmin.password = await user.encryptPassword(userAdmin.password);
        await userAdmin.save();

        const logData = {
            level: 'Info',
            message: `Admin ${user.email} added ${userAdmin.email}`
        }
        const newLog = new logModel(logData);
        await newLog.save();

        return res.status(200).json({ message: 'Signed Up successfully' });
    } catch {

        const logData = {
            level: 'Error',
            message: `Error while amind ${user.email} added new admins`
        }
        const newLog = new logModel(logData);
        await newLog.save();

        return res.status(500).json({ message: 'Error while creating new Admin' });
    }
}

//list
userCtrl.listAll = async (req, res) => {
    const { user } = req;
    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    try {
        const resp = await userModel.find();

        return res.status(200).json(resp)
    } catch {
        return res.status(500).json({ message: 'Failure!' });
    }
}

userCtrl.updateUser = async (req, res) => {
    const { user } = req;
    const data = req.body;
    const { email } = req.params;
    
    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    const resp = await userModel.findOne(email);
    if (!resp) {
        return res.status(204).json({ message: 'No items found' });
    }

    try {
        await resp.updateOne(data);

        const logData = {
            level: 'Info',
            message: `Admin ${user.email} updated ${email} successfully`
        }
        const newLog = new logModel(logData);
        await newLog.save();

        return res.status(200).json({ message: 'Success!' });

    } catch {
        const logData = {
            level: 'Error',
            message: `Error while admin ${user.email} updated ${email}`
        }
        const newLog = new logModel(logData);
        await newLog.save();

        return res.status(500).json({ message: 'Failure!' });
    }
}

//Delete
userCtrl.deleteUser = async (req, res) => {
    const { user } = req;
    const { email } = req.params;

    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const resp = await userModel.findOne(email);
    if (!resp) {
        return res.status(204).json({ message: 'No items found' });
    }

    try {
        await resp.deleteOne();

        const logData = {
            level: 'Info',
            message: `Admin ${user.email} deleted ${email} successfully`
        }
        const newLog = new logModel(logData);
        await newLog.save();

        return res.status(200).json({ message: "Success!" });

    } catch {
        const logData = {
            level: 'Error',
            message: `Error while admin ${user.email} deleted ${email}`
        }
        const newLog = new logModel(logData);
        await newLog.save();

        return res.status(500).json({ message: 'Failure!' });
    }
}

userCtrl.logs = async (req, res) => {
    const { user } = req;
    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const resp = await logModel.find();
        if (resp.length === 0) {
            return res.status(204).send(); // No content available
        }
        return res.status(200).json(resp);
    } catch (error) {
        console.error('Error fetching logs:', error);
        return res.status(500).json({ message: 'Failure!' });
    }
};
module.exports = userCtrl;
