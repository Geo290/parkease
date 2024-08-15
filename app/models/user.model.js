const { Schema, model} = require('mongoose');
const { genSalt, compare, hash } = require('bcryptjs');

const userSchema = new Schema({
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
    },
    isAdmin : {
        type: Schema.Types.Boolean,
        default: false, 
        required: true
    }
},  { timestamps: true }
);

userSchema.methods.encryptPassword = async (password) => {
    const salt = await genSalt(10);
    return hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
    return compare(password, this.password);
};

const userModel = model('user', userSchema);

module.exports = userModel;

