// models/PurchaseOrder.js
const mongoose = require('mongoose');

const poLineSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        description: { type: String, trim: true, maxlength: 4000 },
        quantity: {
            qtyOrdered: { type: Number, required: true, min: 0.0001 },
            qtyReceived: { type: Number, required: true, default: 0, min: 0 },
        },
        unitPrice: { type: Number, required: true, min: 0 },
        taxRate: { type: Number, default: 0, min: 0, max: 100 }, // %
    },
    { _id: false }
);

poLineSchema.virtual('quantityString').get(function () {
    const { qtyOrdered = 0, qtyReceived = 0 } = this.quantity || {};
    return `Ordered: ${qtyOrdered}, Received: ${qtyReceived}`;
});

const purchaseOrderSchema = new mongoose.Schema(
    {
        poNumber: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: true,
        },
        // Optional: receiving warehouse (recommended)
        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warehouse',
        },
        status: {
            type: String,
            enum: ['DRAFT', 'SUBMITTED', 'PARTIAL', 'RECEIVED', 'CANCELLED'],
            default: 'DRAFT',
            required: true,
        },
        priceDetails: {
            purchasePrice: {
                type: Number,
                required: [true, 'Purchase price is required'],
                min: [0.01, 'Purchase price must be greater than 0'],
            },
            currency: {
                type: String,
                enum: ['ZAR', 'NAD', 'OTHER'],
                default: 'ZAR',
                uppercase: true,
                trim: true,
                required: [true, 'Currency is required'],
            },
        },
        lines: { type: [poLineSchema], validate: v => v && v.length > 0 },
        notes: { type: String, maxlength: 4000, trim: true },
        orderedBy: {
            companyName: {
                type: String,
                required: true,
                trim: true,
                minlength: [2, 'Company name must be at least 2 characters long'],
                maxlength: [50, 'Company name cannot exceed 50 characters'],
                index: true,
            },
            username: {
                type: String,
                trim: true,
                required: [true, 'Username is required'],
                index: true,
            },
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

purchaseOrderSchema.index({ poNumber: 1 }, { unique: true });
purchaseOrderSchema.index({ supplier: 1, status: 1 });

purchaseOrderSchema.virtual('orderedByString').get(function () {
    const { companyName = '', username = '' } = this.orderedBy || {};
    return `Company: ${companyName}, User: ${username}`;
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
