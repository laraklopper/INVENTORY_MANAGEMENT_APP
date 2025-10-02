// models/Warehouse.js
// Physical stock location (you can also use "Store", "Bin", etc.)
const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
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
            minlength: [2, 'City name must be at least 2 characters long'],
            maxlength: [50, 'City name cannot exceed 50 characters'],
        },
        postalCode: {
            type: String
        },
        province: {
            type: String,
            trim: true,
            minlength: [2, 'Province name must be at least 2 characters long'],
            maxlength: [50, 'Province name cannot exceed 50 characters'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            enum: ['Namibia', 'South Africa'],
            trim: true,
        },
    },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

warehouseSchema.index({ code: 1 }, { unique: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);
