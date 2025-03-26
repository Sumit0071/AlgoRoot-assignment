import express from 'express';
import { gettasks, markCompleted, createtask, deletetask, updatetask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route( '/' ).get( gettasks ).post( protect, createtask );

// Apply protect middleware:only authorized user can complete the tasks
router.route( '/:id/completed' ).post( protect, markCompleted );
router.route( '/:id/delete' ).post( protect, deletetask );
router.route( '/:id/' ).post( protect, updatetask );

export default router;
