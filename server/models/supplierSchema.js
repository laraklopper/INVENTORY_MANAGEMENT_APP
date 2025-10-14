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
    contactDetails: {
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

const joinDefined = (arr, sep = ', ') =>
    arr.filter(Boolean).map(s => String(s).trim()).filter(Boolean).join(sep);

supplierSchema.virtual('name')
    .get(function () {
        const f = this.fullName?.firstName || '';
        const l = this.fullName?.lastName || '';
        return joinDefined([f, l], ' ');
    })
    .set(function (v) {
        if (typeof v !== 'string') return;
        const parts = v.trim().split(/\s+/);
        const firstName = parts.shift() || '';
        const lastName = parts.length ? parts.join(' ') : '';
        this.fullName = { ...(this.fullName || {}), firstName, lastName };
    });

supplierSchema.virtual('contactSummary').get(function () {
    const email = this.contactDetails?.email;
    const phone = this.contactDetails?.contactNumber;
    return joinDefined([email, phone], ' • ');
});

/**
 * addressOneLine
 * - Single-line formatted address
 *   e.g., "12 Main Rd, Gardens, Cape Town, Western Cape, South Africa"
 */
supplierSchema.virtual('addressOneLine').get(function () {
    const a = this.address || {};
    return joinDefined([a.line1, a.line2, a.city, a.province, a.country]);
});

/**
 * addressMultiLine
 * - Multi-line formatted address for documents/labels
 */
supplierSchema.virtual('addressMultiLine').get(function () {
    const a = this.address || {};
    const lines = [
        joinDefined([a.line1, a.line2]),
        joinDefined([a.city, a.province]),
        a.country,
    ].filter(Boolean);
    return lines.join('\n');
});

// ===================== Indexes =======================
// Unique code stays
supplierSchema.index({ code: 1 }, { unique: true });

// You cannot index a virtual ("name") at the database level.
// Use a compound index on the real fields for fast name searches:
supplierSchema.index({ 'fullName.firstName': 1, 'fullName.lastName': 1 });

// Optional: text index to support flexible name/email searches in one go.
// (Be mindful of text index limitations if you already use other text indexes.)
supplierSchema.index({
    'fullName.firstName': 'text',
    'fullName.lastName': 'text',
    'contactDetails.email': 'text',
});
module.exports = mongoose.model('Supplier', supplierSchema);
