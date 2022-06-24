const mongoose = require('mongoose');
const { Schema } = mongoose;


const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'farm must have a name! ']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'email required']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]

})

// farmSchema.post('findOneAndDelete', async (farm) => {
//     if (farm.products.length) {
//         const deleted = await Product.deleteMany({ _id: { $in: farm.products } });
//         console.log(deleted);
//     }
// })

// DELETE ALL ASSOCIATED PRODUCTS AFTER A FARM IS DELETED
farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const res = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(res);
    }
})


const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
// require Product Model for the middleware 
const Product = require('./product')