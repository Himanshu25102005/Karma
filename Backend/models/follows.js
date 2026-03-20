const mongoose = require("mongoose");

const followSchema = mongoose.createConnection({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

// DEFINE THE INDEX HERE (After the schema, before the model export)
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

module.exports = mongoose.model("follow", followSchema);