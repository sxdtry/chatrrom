const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    user:{type:String},
    nickname:{type:String,required:true},
    password:{type:String,required:true},
    portrait:{type:String,default:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1990625098,3468619056&fm=111&gp=0.jpg"}
})

module.exports = mongoose.model("user",userSchema)