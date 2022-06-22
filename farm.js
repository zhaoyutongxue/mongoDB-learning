const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/oneToMany');
}

// define schema
const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }] //note: here the product array is referencing the product ID
})

// create model
const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

const seed = async () => {
    await Product.insertMany([
        { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
        { name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer' },
        { name: 'Asparagus', price: 3.99, season: 'Spring' },
    ])
    // console.log('1st')
}

const makeFarm = async () => {
    const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' });
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    farm.products.push(melon)
    await farm.save()
    console.log(farm);
    // console.log('2nd')
}

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
    // console.log('3rd')
}

const run = async () => {
    await seed()
    await makeFarm()
    addProduct()
}


run()

// addProduct()
// makeFarm()
// seed()

// Farm.findOne({ name: 'Full Belly Farms' })
//     .populate('products')
//     .then(farm => console.log(farm))


