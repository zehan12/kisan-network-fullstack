const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  contactScehma = new Schema({
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    phoneNumber:{type:String, require:true}
},{timestamps:true});


module.exports =  mongoose.model( "Contact", contactScehma );