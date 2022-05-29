import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    email:{
        type: 'String',
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: 'String',
        require: true,
    }
});

export const User = model('user', userSchema)