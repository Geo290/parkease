require('dotenv').config();

const clientModel = require('../models/client.model.js');
const { sign, verify } = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const clientCtrl = {};

clientCtrl.signup = async (req, res) => {
    try {
        const data = req.body;
        const client = new clientModel(data);

        client.password = await client.encryptPassword(client.password);

        await client.save();

        return res.status(200).json({ message: 'Signed Up successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Error while signing up' });
    }
};

clientCtrl.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const client = await clientModel.findOne({ email: email });
        const isValidPass = await client.validatePassword(password)

        if (!client) {
            return res.status(204).json({ message: 'No items found' });
        }
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
            .send({ client, token });

        // return res.status(200).json({ message: 'Successfully logged in' });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error while logging in' });
    }
}

clientCtrl.logout = async (req, res) => {
    res.status(200).clearCookie('access_token').json({ message: 'Logged out' })
}

clientCtrl.protected = async (req, res) => {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    return res.status(200).json({ message: `Welcome ${user.names}` });
}
module.exports = clientCtrl;