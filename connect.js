const mongoose = require("mongoose");

function connectmongodb(url){
    return mongoose.connect(url);
}

module.exports = {connectmongodb}