const mongoose = require("mongoose");



const dbConnect = () => {

    // If not ready
    if(mongoose.connection.readyState >= 1) {
        return
    }

    mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
    }).then(con => console.log('Successfully connected to localDB'))

}

export default dbConnect;