const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            maxLength: 15,
            required: true
        },
        password: {
            type: String,
            maxLength: 1000 ,
            required: true
        },
        agency:{
            type: ObjectId,
            ref: "Agency"
        },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);