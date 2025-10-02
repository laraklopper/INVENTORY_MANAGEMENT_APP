// models/Supplier.js
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true, 
        uppercase: true, 
        trim: true 
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [2, 'First name must be at least 2 characters long'],
            maxlength: [50, 'First name cannot exceed 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            minlength: [2, 'Last name must be at least 2 characters long'],
            maxlength: [50, 'Last name cannot exceed 50 characters'],
        },
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    contactNumber: {
        type: String,
        trim: true,
        required: [true, 'Contact number is required'],
    },
    address: {
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
        city: {
            type: String,
            required: [true, 'City or town name is required'],
            trim: true,
            minlength: [2, 'City or town name must be at least 2 characters long'],
            maxlength: [50, 'City or town name cannot exceed 50 characters']
        },
        province: {
            type: String,
            trim: true,
            minlength: [2, 'Province name must be at least 2 characters long'],
            maxlength: [50, 'Province name cannot exceed 50 characters']
        },
        country: {
            type: String,
            reqiured: [true, 'Country is required'],
            enum: ['Namibia', 'South Africa', 'Other'],
            trim: true,
        },    
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    notes: { 
        type: String, 
        maxlength: 2000 
    },
}, { timestamps: true,
    toJSON: {virtuals: true},
    toObject:{virtuals: true}
 });

supplierSchema.index({ code: 1 }, { unique: true });
supplierSchema.index({ name: 1 });

module.exports = mongoose.model('Supplier', supplierSchema);
