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

//===============VIRTUALS====================
userSchema.virtual('fullNameString').get(function () {
    const {firstName, lastName} = this.fullName;
    return `${firstName} ${lastName}`.trim();
})

userSchema.virtual('contactDetailsString').get(function () {
    const {email = '', contactNumber = ''} = this.contactDetails;
    return `Email: ${email}, Phone: ${contactNumber}`;
})
//===========HOOKS==============


//Export the schema
module.exports = mongoose.model('User', userSchema);