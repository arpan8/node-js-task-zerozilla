const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 15,
            required: true
        },
        agency:{
            type: ObjectId,
            ref: "Agency",
            required: true
        },
        email: {
            type: String,
            maxLength: 150,
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

module.exports = mongoose.model('Client', clientSchema);