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
    //=================NESTED FULL NAME OBJECT===================
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
    //=================NESTED CONTACT DETAIL OBJECT=============
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
    //======================NESTED SHIPPING ADDRESS OBJECT===================
    shippingAddress: {
        line1: {
            // Street / block number
            type: String,
            trim: true,
            minlength: [1, 'Line 1 must be at least 1 character long'],
            maxlength: [1000, 'Line 1 cannot exceed 1000 characters'],
        },
        line2: {
            // Street / block
            type: String,
            trim: true,
            minlength: [2, 'Line 2 must be at least 2 characters long'],
            maxlength: [100, 'Line 2 cannot exceed 100 characters'],
        },
        city:{
            type: String,
            required: [true, 'City or town name is required'],
            trim: true,
            minlength: [2, 'City or town name must be at least 2 characters long'],
            maxlength: [50, 'City or town name cannot exceed 50 characters']
        },
        country: {
            type: String,
            reqiured: [true, 'Country is required'],
            enum: ['Namibia', 'South Africa'],
            trim: true,
        }, 
        province: {
            type: String,
            trim: true,
            minlength: [2, 'Province name must be at least 2 characters long'],
            maxlength: [50, 'Province name cannot exceed 50 characters']
        },
    },
    //===========NESTED PAYMENT DETAILS OBJECT===============
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

// ===== Indexes (Mongo will create compound indexes for nested paths) =====
customerSchema.index({ code: 1 }, { unique: true });
customerSchema.index({ 'contactDetails.email': 1 }, { unique: true });
customerSchema.index({ 'contactDetails.contactNumber': 1 }, { unique: true });

//===============VIRTUALS====================
customerSchema.virtual('fullNameString').get(function () {
    const { firstName, lastName } = this.fullName;
    return `${firstName} ${lastName}`.trim();
})

customerSchema.virtual('contactDetailsString').get(function () {
    const { email = '', contactNumber = '' } = this.contactDetails;
    return `Email: ${email}, Phone: ${contactNumber}`;
})

customerSchema.virtual('shippingAddressString').get(function () {
    const a = this.shippingAddress || {};
    const parts = [a.line1, a.line2, a.city, a.province, a.country]
        .filter(Boolean)
        .map((s) => String(s).trim());
    return parts.join(', ');
});

customerSchema.virtual('paymentDetailsString').get(function () {
    const p = this.paymentDetails || {};
    const paidText = p.paid ? 'Paid' : 'Unpaid';
    const notes = p.notes ? ` (Notes: ${p.notes.trim()})` : '';
    return `${paidText}${notes}`;
});


module.exports = mongoose.model('Customer', customerSchema)