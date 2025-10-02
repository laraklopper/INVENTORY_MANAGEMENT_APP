const mongoose = require('mongoose');



const poLineSchema = new mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Products', 
        required: true 
    },
    description: { 
        type: mongoose.Schema.Types.ObjectId, 
        trim: true, 
        maxlength: 4000 
    },
    qtyOrdered: { 
        type: Number, 
        required: true, 
        min: 0.0001 
    },
    qtyReceived: { type: Number, required: true, default: 0, min: 0 },
    unitPrice: { type: Number, required: true, min: 0 }, 
    taxRate: { type: Number, default: 0, min: 0 },      // % (e.g., 15 for 15%)
}, { _id: false });
const purchaseOrderSchema = new mongoose.Schema({
    productCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    productTitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
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
    supplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier', 
        required: true 
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be greater than 0'],
    },
    purchasePrice: {
        price: {
            type: Number,
            required: [true, 'Purchase price is required'],
            min: [0.01, 'Purchase price must be greater 0'],
        },
        currency: {
            type: String, 
            enum: ['ZAR', 'NAD', 'OTHER'],
            default: 'ZAR',//Namibian dollar or RAND  other 
            uppercase: true, 
            trim: true,
            required: true,
        },
    },
    status: {
        type: String,
        enum: ['DRAFT', 'SUBMITTED', 'PARTIAL', 'RECEIVED', 'CANCELLED'],
        default: 'DRAFT'
    },
    dateOrdered: {
        type: Date,
        required: true,
        default: Date.now,
    },
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});