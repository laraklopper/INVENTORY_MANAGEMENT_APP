const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactNumberRegex = /^(\+27|0)\d{2}[ ]?\d{3}[ ]?\d{4}$/;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        minlength: [2, 'Username must be at least 2 characters long'],
        maxlength: [50, 'Username cannot exceed 50 characters'],
    },
    companyName: {
        type: String,
        trim: true,
        required: [true, 'Company Name is required'],
        minlength: [2, 'Company name must be at least 2 characters long'],
        maxlength: [50, 'Company name cannot exceed 50 characters'],
    },
    position: {
        type: String,
        enum: ['manager', 'admin', 'clerk', 'viewer'],
        default: 'viewer',
    },
    fullName: {
        firstName:{
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [2, 'First name must be at least 2 characters long'],
            maxlength: [50, 'First name cannot exceed 50 characters'],
        },
        lastName:{
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            minlength: [2, 'Last name must be at least 2 characters long'],
            maxlength: [50, 'Last name cannot exceed 50 characters'], 
        },
    },
    contactDetails:{
        email:{
            type: String,
            required: [true, 'User email is required'],
            trim: true,
            lowercase: true,
            validate: {
                validator: (v) => emailRegex.test(v), // Validate using regular expression
                message: (props) => `${props.value} is not a valid email address` // Custom error message for invalid emails
            }
        },
        
            contactNumber: {
                type: String,
                trim: true,
                required: [true, 'Contact number is required'],
                validate: {
                    validator: (v) => contactNumberRegex.test(v), // Validate using predefined regex for South African numbers
                    message: 'Invalid South African contact number (e.g., +27 82 123 4567 or 082 123 4567)' // Custom error message for invalid numbers
                }
            },
        
    },
    dateOfBirth:{
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function (v) {
                return v instanceof Date && !isNaN(v.getTime()) && v < new Date();
            },
            message: 'Date of birth must be in the past'
        }
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [1024, 'Password cannot exceed 1024 characters'],
        select: false // << prevent password from being returned in queries by default
    },
    admin:{
        type: Boolean,
        default: false 
    }

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
function cap(str) {
    return typeof str === 'string' && str.length
        ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        : str;
}

// Pre-save hook to capitalize name and company
userSchema.pre('save', function (next) {
    if (this.username) {
        this.username = cap(this.username);
    }
    if (this.fullName?.firstName) {
        this.fullName.firstName = cap(this.fullName.firstName);
    }
    if (this.fullName?.lastName) {
        this.fullName.lastName = cap(this.fullName.lastName);
    }
    if (this.companyName) {
        this.companyName = cap(this.companyName);
    }
    next();
});


//Export the schema
module.exports = mongoose.model('User', userSchema);