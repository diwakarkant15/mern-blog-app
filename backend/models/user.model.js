
import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blog_id: {
        type: String,
    }
}, {timestamps: true} )


const User = mongoose.model('User', userModel);

export default User;
