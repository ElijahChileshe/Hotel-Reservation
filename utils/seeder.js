const rooms = require("../models/rooms");
const importRooms = require("../data/rooms");
const dbConnect = require("../config/dbConnect");
const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost:27017/bookit", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => console.log('Successfully connected to localDB'))



const seedRooms = async () => {
    try {

        await rooms.deleteMany()
        console.log("Deleted current rooms");

        await rooms.insertMany(importRooms);
        console.log('All rooms added');
        
    } catch (error) {

        console.log(error.message);
        process.exit()
        
    }
}

seedRooms()