const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    productCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product Code is required']
    },
    productTitle: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    qtyOnHand: { 
        type: Number, 
        required: true, 
        default: 0, 
        min: 0 
    }, // physically present
    qtyReserved: { 
        type: Number, 
        required: true, 
        default: 0, 
        min: 0 
    }, // committed to sales/orders
    safetyStock: { 
        type: Number, 
        default: 0, 
        min: 0 
    },
}, { 
    timestamps: true,
    toJSON: {virtuals:true},
    toObject: {virtuals: true}
 });

// (productTitle, productCode) must be unique
stockLevelSchema.index({ productTitle: 1, code: 1}, { unique: true });

// Virtual: qtyAvailable = onHand - reserved
stockLevelSchema.virtual('qtyAvailable').get(function () {
    return Math.max(0, (this.qtyOnHand || 0) - (this.qtyReserved || 0));
});


module.exports = mongoose.model('Stock', stockSchema)