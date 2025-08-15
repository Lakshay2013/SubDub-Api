import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// -----------------------------
// Sign Up Controller
// -----------------------------
export const signUP = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Name, email, and password are required.',
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statuscode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create(
            [{ name, email, password: hashedPassword }],
            { session }
        );

        const token = jwt.sign(
            { userId: newUser[0]._id }, // <-- lowercase 'userId' for middleware consistency
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0],
            },
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

// -----------------------------
// Sign In Controller
// -----------------------------
export const signIN = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Email and password are required.",
            });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            const error = new Error("User does not exist");
            error.statuscode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid credentials");
            error.statuscode = 401;
            throw error;
        }

        const token = jwt.sign(
            { userId: user._id }, // <-- lowercase 'userId'
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        user.password = undefined; // remove password from response

        return res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user,
            },
        });

    } catch (error) {
        next(error);
    }
};

// -----------------------------
// Sign Out Controller
// -----------------------------
export const signOUT = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "User signed out (client must delete token).",
        });
    } catch (error) {
        next(error);
    }
};
