// models/Warehouse.js
const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Warehouse code is required'],
        unique: true,
        uppercase: true,
        trim: true,
        minlength: [2, 'Warehouse code must be at least 2 characters long'],
        maxlength: [12, 'Warehouse code cannot exceed 12 characters'],
    },
    // Human-friendly display name
    name: {
        type: String,
        required: [true, 'Warehouse name is required'],
        trim: true,
        minlength: [2, 'Warehouse name must be at least 2 characters long'],
        maxlength: [80, 'Warehouse name cannot exceed 80 characters'],
    },
    // Physical address
    address: {
        line1: {
            type: String,
            trim: true,
            minlength: [2, 'Address line 1 must be at least 2 characters long'],
            maxlength: [100, 'Address line 1 cannot exceed 100 characters'],
        },
        line2: {
            type: String,
            trim: true,
            maxlength: [100, 'Address line 2 cannot exceed 100 characters'],
        },
        city: {
            type: String,
            trim: true,
            minlength: [2, 'City must be at least 2 characters long'],
            maxlength: [50, 'City cannot exceed 50 characters'],
        },
        province: {
            type: String,
            trim: true,
            minlength: [2, 'Province must be at least 2 characters long'],
            maxlength: [50, 'Province cannot exceed 50 characters'],
        },
        postalCode: {
            type: String,
            trim: true,
            maxlength: [12, 'Postal code cannot exceed 12 characters'],
        },
        country: {
            type: String,
            enum: countryEnum,
            default: 'South Africa',
            required: [true, 'Country is required'],
            trim: true,
        },
    },
    // Warehouse status
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// ===== Indexes =====
warehouseSchema.index({ code: 1 }, { unique: true });
warehouseSchema.index({ name: 1 });

// ===== Virtuals =====
warehouseSchema.virtual('fullAddressString').get(function () {
    const a = this.address || {};
    return [a.line1, a.line2, a.city, a.province, a.postalCode, a.country]
        .filter(Boolean)
        .map(s => String(s).trim())
        .join(', ');
});



module.exports = mongoose.model('Warehouse', warehouseSchema);
