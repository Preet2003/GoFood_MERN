
require('dotenv').config();
// install mongoose
const mongoose = require('mongoose');

// change the password and add the name of the database before the ?retryWrites
const mongoURI = process.env.MONGO_URI;

const mongoDB = async ()=>{

    // connect to the mongodb database => old method
    // but now .connect() returns a promise and doesnot accept a callback function
    // mongoose.connect(mongoURI,()=>{
    //     console.log('connected to mongoDB');
    // });

    // new method => keep in try catch block to handle errors and use async await to handle promises
    try{
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');

        // fetch the data
        const db = mongoose.connection.db;
        const collection = db.collection('food_items');

        // to find all data => find({})
        // to find specific data => find({name: 'name'})
        // convert to array to get the data

        const result = await collection.find({}).toArray();
        
        // store the data in a global variable => way to declare global variable
        // global variable available throughout the application
        global.food_items = result;
        console.log('Data fetched successfully');

        // once i have data successfully i want to cateogarise it using collection food_cateogary

        // this is giving null
        const collection2 = db.collection('food_cateogary');
        const result2 = await collection2.find({}).toArray();
        global.food_cateogary = result2;
        console.log('Data fetched successfully');
    }
    catch(err){
        console.log('MongoDB connection failed');
        console.log(err);
    }
};

module.exports = mongoDB;