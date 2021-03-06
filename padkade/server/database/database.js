const mongoose = require('mongoose');
const config = require('../../config');

const connect = async() =>{
    try{
        // mongodb cloud connection
        const con = await mongoose.connect(config.MONGO_URI )

        console.log(`MongoDB Connected : ${con.connection.host}`)
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connect