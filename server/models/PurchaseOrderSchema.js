// Simple PO header + lines. Receive against PO to create RECEIPT transactions.
const mongoose = require('mongoose');

//Define (Purchase order)  poLine Schema
const poLineSchema = new mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Products', 
        required: true 
    },
    description: { 
        type: String, 
        trim: true, 
        maxlength: 4000 
    },
    quantity: {
        qtyOrdered: {
            type: Number,
            required: true,
            min: 0.0001
        },
        qtyReceived: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
    },
    unitPrice: { 
        type: Number, 
        required: true, 
        min: 0 
    }, 
    taxRate: { 
        type: Number, 
        default: 0, 
        min: 15 
    },      // % (e.g., 15 for 15%)
}, { _id: false,});

poLineSchema.virtual('quantityString').get(function () {
    const { qtyOrdered = '', qtyReceived = '' } = this.quantity;
    return `Ordered:  ${qtyOrdered}, Recieved: ${qtyReceived}`
})

//Define PurchaseOrder Schema
const purchaseOrderSchema = new mongoose.Schema({
    poNumber: { 
        type: String, 
        required: true, 
        unique: true, 
        uppercase: true, 
        trim: true 
    },
    supplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier', 
        required: true 
    },
    status: {
        type: String,
        enum: ['DRAFT', 'SUBMITTED', 'PARTIAL', 'RECEIVED', 'CANCELLED'],
        default: 'DRAFT',
        required: true,
    },
    currency: { 
        type: String,
        enum: ['ZAR', 'NAD', 'OTHER'],
        default: 'ZAR',//Namibian dollar or RAND  other 
        uppercase: true,
        trim: true,
        required: [true , 'Currency is required'],
    },
    lines: { 
        type: [poLineSchema], 
        validate: v => v.length > 0 
    },
    notes: { type: String, maxlength: 4000 },
    orderedBy: {
        companyName: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            minlength: [2, 'Company name must be at least 2 characters long'],
            maxlength: [50, 'Company name cannot exceed 50 characters'],
            index: true,
        },
        username: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            required: [true, 'username is required'],
            index: true,
        }
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
 });

purchaseOrderSchema.index({ poNumber: 1 }, { unique: true });
purchaseOrderSchema.index({ supplier: 1, status: 1 });

purchaseOrderSchema.virtual('orderedByString').get(function () {
    const { companyName = '', username = '' } = this.orderedBy;
    return `Company: ${companyName}, User: ${username}`;
})


module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
