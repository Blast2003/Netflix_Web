import mongoose from "mongoose";

const userSchema  = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minlength: [6,"Password must be at least 6 characters"],
        required: true
    },
    image:{
        type: String,
        default: ""
    },
    searchHistory:{
        type: Array,
        default: []
    }
},{
    timestamps: true,
}) 

export const User = mongoose.model("User", userSchema) // create users collection



