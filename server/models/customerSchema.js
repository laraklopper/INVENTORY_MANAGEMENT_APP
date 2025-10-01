const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// Regular expression for validating email formats
const contactNumberRegex = /^(\+27|0)\d{2}[ ]?\d{3}[ ]?\d{4}$/;// Regular expression for validating South African phone numbers

const customerSchema = new mongoose.Schema({
    code: {
        type: String,
        reqiured: [true, 'Customer code is required'],
        trim: true,
        set: (v) => v.toUpperCase(),
    },
    fullName: {
        // Field for customer first name
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [2, 'First name must be at least 2 characters long'],
            maxlength: [50, 'First name cannot exceed 50 characters'],
        },
        // Field for customer last name
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            minlength: [2, 'Last name must be at least 2 characters long'], 
            maxlength: [50, 'Last name cannot exceed 50 characters'], 
        }
    },
    contactDetails:{
        email:{
            type: String,
            required: [true, 'Customer email is required'],
            unique: true,
            trim: true,
            set: (v) => toLowerCase(),
            validate: {
                validator: (v) => emailRegex.test(v), // Validate using regular expression
                message: (props) => `${props.value} is not a valid email address` // Custom error message for invalid emails
            }
        },
        contactNumber: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Contact number is required'],
            validate: {
                validator: (v) => contactNumberRegex.test(v), // Validate using predefined regex for South African numbers
                message: 'Invalid South African contact number (e.g., +27 82 123 4567 or 082 123 4567)' // Custom error message for invalid numbers
            }
        },
    },
    shippingAddress: {
        street:{
            type: String,
            required: [true, 'Street Name is required'],
            minlength: [2, 'Street name must be at least 2 characters long'],
            maxlength: [50, 'Streetname cannot exceed 50 characters']
        },
        city:{
            type: String,
            required: [true, 'City name is required'],
            trim: true,
            minlength: [2, 'City name must be at least 2 characters long'],
            maxlength: [50, 'City name cannot exceed 50 characters']
        },
        country: {
            type: String,
            reqiured: [true, 'Country is required'],
            enum: ['Namibia', 'South Africa']
        }, 
        province: {
            type: String,
            trim: true,
            minlength: [2, 'Province name must be at least 2 characters long'],
            maxlength: [50, 'Province name cannot exceed 50 characters']
        },
    },
    paymentDetails:{
        paid: {
            type: Boolean,
            default: false,
        },
        notes: {
            type: String,
            maxLength: 2000,
            reqiured: false
        }
    },
    // If the customer has not yet paid the customer is active
    isActive: {
        type: Boolean,
        default: true

    }
},{
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});


module.exports = mongoose.model('customers', customerSchema)