import bcryptjs from 'bcryptjs';
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

userSchema.pre('save', async function(next){
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error('Falló el hash de contraseña');
    }
});

userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcryptjs.compare(candidatePassword, this.password)
}

export const User = model('User', userSchema)