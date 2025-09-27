const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactNumberRegex = /^(\+27|0)\d{2}[ ]?\d{3}[ ]?\d{4}$/;

const userSchema = new mongoose.Schema({
    username: {
        
    },
    companyName: {

    },
    position: {

    },
    fullName: {
        firstName:{},
        lastName:{},
    },
    contactDetails:{
        email:{},
        contactDetails:{},
    },
    dateOfBirth:{},
    admin:{}

},{
    timestamps: true,
    toJSON:{virtuals: true},
    toObject:{virtuals: true}
});

module.exports = mongoose.model('User', userSchema);