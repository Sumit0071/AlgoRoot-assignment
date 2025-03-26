import express from 'express';
import {
    createUser,
    loginUser,
} from '../controllers/userController.js';


const router = express.Router();

// Route to create a new user

    router.route('/register').post(createUser);

// Route for user login
router.route('/login').post(loginUser);

export default router;
