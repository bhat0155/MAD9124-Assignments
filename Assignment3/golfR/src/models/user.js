const {model, Schema}=require("mongoose");

const userSchema= new Schema({
    name:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 64,
    },
    googleId:{
        type: String,
        required: true,
        unique: true
    }
})

const User= model("User", userSchema)

module.exports= User