// models/StockLevel.js
const mongoose = require('mongoose');

const stockLevelSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            index: true,
        },
        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warehouse',
            required: true,
            index: true,
        },
        qtyOnHand: { 
            type: Number, 
            required: true, 
            default: 0, 
            min: 0 
        },
        qtyReserved: { 
            type: Number, 
            required: true, 
            default: 0,
            min: 0 
        },
        safetyStock: { 
            type: Number, 
            default: 0, 
            min: 0 
        },
    },
    { 
        timestamps: true, 
        toJSON: { virtuals: true }, 
        toObject: { virtuals: true } 
    }
);

stockLevelSchema.index({ product: 1, warehouse: 1 }, { unique: true });

stockLevelSchema.virtual('qtyAvailable').get(function () {
    return Math.max(0, (this.qtyOnHand || 0) - (this.qtyReserved || 0));
});

module.exports = mongoose.model('StockLevel', stockLevelSchema);
