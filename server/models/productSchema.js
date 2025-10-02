const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productCode: {
        type: String,
        trim: true,
        required: [true, 'Product code is required'],
         minlength: [3, 'Product code must be at least 2 characters long'],
        maxlength: [20, 'Product code cannot exceed 20 characters']
    }, 
    productTitle: {
        type: String,
        required: [true, 'Product title is required'],
        trim: true,
        minlength: [2, 'Product title must be at least 2 characters long'],
        maxlength: [50, 'Product title cannot exceed 50 characters'],
    },
    description: {
        type: String, 
        required: [true, 'productDescription is required'],
        maxlength: 4000,
        minlength: 2,
    },
    defaultSupplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier',
        required: [true, 'Product supplier is required'] 
    },
   
    sellingPrice: {
        type: Number,
        required: [true, 'Selling price is required'],
        min: [0.01, 'Selling price must be greater 0'],
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

    //Export the product schema
    module.exports = mongoose.model('Products', productSchema)