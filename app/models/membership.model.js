const { Schema, model } = require('mongoose');
const userModel = require('./user.model');

const MembershipSchema = new Schema({
    client: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: userModel,
            required: true
        },
        names: {
            type: Schema.Types.String,
            required: true
        },
        lastnames: {
            type: Schema.Types.String,
            required: true
        }
    },
    clientVehicle: {
        plateNumber: {
            type: Schema.Types.String,
            required: true
        },
        model: {
            type: Schema.Types.String,
            required: true
        },
        year: {
            type: Schema.Types.Number,
            required: true
        },
        color: {
            type: Schema.Types.String,
            required: true
        }
    },
    lot: {
        type: Schema.Types.Number,
        required: true
    },
    isActive: {
        type: Schema.Types.Boolean,
        reqiured: true
    }
}, { timestamps: true }
);

const membershipModel = model('memberships', MembershipSchema);

module.exports = membershipModel;