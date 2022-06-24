const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/oneToBajillion');
}

// define schema
const userSchema = new Schema({
    name: String,
    team: String
});

const tweetSchema = new Schema({
    likes: String,
    comments: String,
    userName: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

// create model
const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const seed = async () => {
    await Tweet.insertMany([
        { likes: 10, comments: '1st ring' },
        { likes: 20, comments: '2nd ring' },
        { likes: 30, comments: '3rd ring' },
        { likes: 40, comments: '4th ring' },
    ])
}

const assignTweet = async () => {
    const user = new User({ name: 'Dreymond Green', team: 'Golden State Warriors' });
    await user.save();
    const tweets = await Tweet.find();
    // console.log('these are the tweets' + tweets)
    for (tweet of tweets) {
        // console.log(tweet)
        tweet.userName.push(user);
        await tweet.save();
    }
}




const run = async () => {
    await Tweet.deleteMany();
    await User.deleteMany();
    await seed();
    assignTweet();
}

run()

// Tweet.find()
//     .populate('userName', 'team')
//     .then(tweet => console.log(...tweet))