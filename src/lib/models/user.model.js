import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
    }
},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User;