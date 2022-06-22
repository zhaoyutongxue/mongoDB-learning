const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/oneToFew');
}

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    age: Number,
    addresses: [{
        street: String,
        city: String,
        state: String,
        country: String
    }]


});

const User = mongoose.model('User', userSchema);

const u = new User({
    first: 'Harry',
    last: 'Potter',
    age: 9,
    addresses: [{
        street: 1,
        city: 'New York',
        state: 'NY',
        country: 'USA'
    }]
})

// const addUser = async () => { await u.save() };
// addUser();

const addAddress = async (id) => {
    const data = await User.findById(id);
    data.addresses.push({ street: 8, city: 'Ryde', state: 'NSW', country: 'Australia' });
    const res = await data.save();
    console.log(res)
}

addAddress('62b2aa60e16ad06c32d2bf31');