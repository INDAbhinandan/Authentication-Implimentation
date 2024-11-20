

import { hashPassword, comparePassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

// Registration controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validate input
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const user = new userModel({
            name,
            email,
            address,
            phone,
            password: hashedPassword,
        });
        await user.save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send({
            success: false,
            message: 'Server error during registration'
        });
    }
};

// Login controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Check email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email not registered'
            });
        }

        // Compare password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid password'
            });
        }

        // Generate token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
            },
            token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({
            success: false,
            message: 'Server error during login'
        });
    }
};

// Test controller
export const testController = (req, res) => {
    res.send({
        message: "Hello, I am Ankita Rai"
    });
};
