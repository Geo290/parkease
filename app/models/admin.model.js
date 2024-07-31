const { Schema, model} = require('mongoose');
const { genSalt, compare, hash } = require('bcryptjs');

const adminSchema = new Schema({
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
    password: {
        type: Schema.Types.String,
        required: true
    }
},  { timestamps: true }
);

adminSchema.methods.encryptPassword = async (password) => {
    const salt = await genSalt(10);
    return hash(password, salt);
};

adminSchema.methods.validatePassword = function (password) {
    return compare(password, this.password);
};

const adminModel = model('admin', adminSchema);

module.exports = adminModel;

