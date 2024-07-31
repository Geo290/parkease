    require('dotenv').config();

const adminModel = require('../models/admin.model.js');
const { sign, verify } = require('jsonwebtoken');

const adminCtrl = {};

//Sign Up
adminCtrl.signup = async (req, res) => {
    try {
        const data = req.body;
        const admin = new adminModel(data);

        admin.password = await admin.encryptPassword(admin.password);

        await admin.save();

        return res.status(200).json({ message: 'Signed Up successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Error while signing up' });
    }
};

//Update 
adminCtrl.updateAdmin = async (req, res) => {
    try {
        const { names } = req.query;
        const resp = await adminModel.findOne({ names });

        if (!resp) {
            return messageGeneral(res, 404, false, "", "Record not found");
        }
        await resp.updateOne(req.body);
        messageGeneral(res, 200, true, "", "Updated record");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

//Delete
adminCtrl.deleteAdmin = async (req, res) => {
    try {
        const { names } = req.query;
        const resp = await adminModel.findOne({ names });

        if (!resp) {
            return messageGeneral(res, 404, false, "", "Record not found");
        }

        await resp.deleteOne();
        messageGeneral(res, 200, true, "", "Delete record");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}

//LOGIN
adminCtrl.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email: email });
        const isValidPass = await admin.validatePassword(password)

        if (!admin) {
            return res.status(204).json({ message: 'No items found' });
        }
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
                lastnames: admin.lastnames
            },
            `${process.env.SECRET_JWT_KEY}`,
            {
                expiresIn: '10m'
            }
        );

        res
            .cookie('access_token', token, { // creating a cookie that stores data of the current user
                httpOnly: true,  // the cookie is only accessed via HTTP protocol
                //secure:  , // The cookie is only via HTTPS protocol
                sameSite: 'strict', // cookie is only accessed in the same domain
                maxAge: 1000 * 60 * 60
            })
            .send({ admin, token });

        // return res.status(200).json({ message: 'Successfully logged in' });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error while logging in' });
    }
}

module.exports = adminCtrl;