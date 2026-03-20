const mongoose = require("mongoose");

const activitySchema = mongoose.createConnection({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    actType: String, 
    metadata:{
        type: [Number],
        default: []
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

module.exports = mongoose.model("activity", activitySchema);