const mongoose = require("mongoose");


async function openDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/test')
        console.log("connection open")
    }
    catch (err) {
        console.log("error!")
        console.log(err)
    }
}

openDB()

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String

});

const Movie = mongoose.model('Movie', movieSchema);

const starWar = new Movie({ title: 'Star wars', year: 2000, score: '9.5' });

const updateStarWar = async () => {
    await starWar.save();
}

updateStarWar();

// Movie.insertMany([
//     { title: 'a', year: '2000', score: '8' },
//     { title: 'b', year: '2000', score: '9' },
//     { title: 'c', year: '2001', score: '10' },
//     { title: 'd', year: '2002', score: '6' },
//     { title: 'e', year: '2003', score: '6' },
//     { title: 'f', year: '2004', score: '8.5' },
//     { title: 'test for repeat', year: '2022' }
// ])
//     .then(data => {
//         console.log('it worked!')
//         console.log(data);
//     })