const { Schema, model} = require('mongoose');
const { genSalt, compare, hash } = require('bcryptjs');

const ClientSchema = new Schema({
    names: {
        type: Schema.Types.String,
        required: true
    },
    lastnames: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    phoneNumber: {
        type: Schema.Types.Number,
        required: true
    },
    birthDay: {
        type: Schema.Types.String,
        required: true
    },
    paymenthMethodId: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
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