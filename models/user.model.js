import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User Name is required'],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            unique: true,
            minlength: 5,
            maxlength: 255,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false // hides password by default
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;



