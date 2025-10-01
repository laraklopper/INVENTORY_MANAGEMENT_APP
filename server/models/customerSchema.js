const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    code: {},
    fullName:{
        firstName: {},
        lastName: {},
    },
    contactDetails:{
        email:{

        },
        phone:{

        },
    },
    shippingAddress: {
        street:{

        },
        city:{

        },
        postalCode:{

        }, 
        province: {

        },
        country:{

        },
        
    },
    paymentDetails:{
        paid: {
            type: Boolean,
            default: false,
        },
        notes: {
            type: String,
            maxLength: 2000,
            reqiured: false
        }
    }
});

module.exports = mongoose.model('customers', customerSchema)