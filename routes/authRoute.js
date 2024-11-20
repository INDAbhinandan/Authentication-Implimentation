import express from 'express';
import { registerController, loginController, testController } from '../controllers/AuthController.js'

import { varifySignin, isAdmin } from '../middleweares/AuthMiddle.js';

/* Create a router object */
const router = express.Router()

//Rounting
//REGISTER || METHOD POST
router.post('/register', registerController)
//LOGIN || METHOD POST
router.post('/login', loginController)

// test route
router.get('/test', varifySignin, isAdmin, testController)

export default router






//http://localhost:3000/api/v1/auth/register