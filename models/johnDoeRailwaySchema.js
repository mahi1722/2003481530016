const mongoose = require("mongoose")

const johnDoeRailwaySchema = new mongoose.Schema({
    trainName:{
        type:String
    },
    trainNumber:{type:String},
    departureTime:{
        hours:{type:Number},
        minutes:{type:Number},
        seconds:{type:Number}
    },
    seatAvailability:{
        sleeper:{type:Number},
        AC:{type:Number}
    },
    price:{
        sleeper:{type:Number},
        AC:{type:Number}
    },
    delayedBy:{
        type:Number
    }
})


const JohnDoeRailway = mongoose.model("JohnDoeRailway", johnDoeRailwaySchema);

module.exports = JohnDoeRailway;