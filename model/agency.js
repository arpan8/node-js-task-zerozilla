const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const agencySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 15,
            required: true
        },
        address1: {
            type: String,
            maxLength: 150,
            required: true
        },
        address2: {
            type: String,
            maxLength: 150
        },
        state: {
            type: String,
            maxLength: 15,
            required: true
        },
        city: {
            type: String,
            maxLength: 15,
            required: true
        },
        ph_no: {
            type: Number,
            maxLength: 10,
            required: true
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true
        }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('Agency', agencySchema);