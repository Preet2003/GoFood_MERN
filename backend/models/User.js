// destructuring the schema from mongoose

const mongoose = require('mongoose');

const { Schema } = mongoose;

// create a schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

// export the schema
// model('name', schema) => is name ka collection banega database me
// model ke help se hum log crud operations karenge

// model is a wrapper for the schema

// use this model in routes to perform crud operations
module.exports = mongoose.model('User', userSchema);