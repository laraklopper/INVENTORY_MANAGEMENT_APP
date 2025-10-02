const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
            required: [true, 'username is required'],
            index: true,
        }
    },
    productDetails: {
        code: {
            type: String,
            trim: true,
        }, 
        title: {
            type: String,
            minlength: [2, 'Product title must be at least 2 characters long'],
            maxlength: [50, 'Product title cannot exceed 50 characters'],
        },
        description: { 
            type: String, 
            maxlength: 4000,
            minlength: 2,
         },
    },
    defaultSupplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier',
        required: [true, 'Product supplier is required'] 
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'quantity must be greater than 0'],
    },
    purchasePrice: {
        type: Number,
        required: [true, 'Purchase price is required'],
        min: [0.01, 'Purchase price must be greater 0'],
    },
    sellingPrice: {
        type: Number,
        required: [true, 'Selling price is required'],
        min: [0.01, 'Selling price must be greater 0'],
    },
    dateOrdered: {
        type: Date,
        required: true,
        default: Date.now,
    },
    },{
      timestamps: true,
      toJSON: {virtuals: true},
      toObject: {virtuals:true}  
    })

    //==============VIRTUALS===================
    productSchema.virtual('orderedByString').get(function () {
        const { companyName = '', username = '' } = this.orderedBy;
        return `Company: ${companyName}, User: ${username}`;
    });
    productSchema.virtual('productDetailsString').get(function () {
        const { code= '', productTitle = '', productDescription = '' } = this.product;
        return `Code: ${code} Title:  ${productTitle}, Description: ${productDescription}`
    })

    //Export the product schema
    module.exports = mongoose.model('Products', productSchema)