const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name:{ type:String, require: true },
    phoneNumber:{ type:String, require: true },
    message: { type:String, require: true },
    OTP:{ type:String, require: true },
    status: { type:String, default:"pending", require: true },
    sid: String
},{timestamps:true});


module.exports = mongoose.model("Message", messageSchema);