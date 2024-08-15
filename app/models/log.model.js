const { Schema, model } = require('mongoose');

const LogSchema = new Schema({
    level: {
        type: Schema.Types.String,
        required: true
    },
    message: {
        type: Schema.Types.String,
        required: true
    }
}, { timestamps: true }
);

const logModel =model('logs', LogSchema);

module.exports = logModel;