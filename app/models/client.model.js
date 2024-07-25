const { Schema, model} = require('mongoose');
const { genSalt, compare, hash } = require('bcryptjs');

const ClientSchema = new Schema({
    names: {
        type: String,
        required: true
    },
    lastnames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    birthDay: {
        type: String,
        required: true
    },
    paymenthMethodId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},  { timestamps: true }
);

ClientSchema.method.encryptPassword = async (password) => {
    const salt = await genSalt(10);
    return hash(password, salt);
};

ClientSchema.method.validatePassword = (password) => {
    return compare(password, this.password);
};

const clientModel = model('client', ClientSchema);

module.exports = clientModel;