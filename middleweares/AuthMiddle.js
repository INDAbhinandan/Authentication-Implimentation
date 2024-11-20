import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

// varify token
export const varifySignin = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRETKEY);
        req.user = decode;
        next()
    } catch (error) {
        res.send({
            error: 'Invalid token'
        })
    }
}

// varify Admin

export const isAdmin = async (req, res, next) => {

    try {
        const user = await userModel.findById(req.user.id)
        if (user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: 'Unauthorized User'
            })
        } else {
            next()
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            error: error.message,

            message: 'Error in Admin middleware'
        })
    }
}