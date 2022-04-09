const mongoose = require('mongoose');
//const crypto = require('crypto');

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
            type: String,
            maxLength: 10,
            required: true
        },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('Agency', agencySchema);