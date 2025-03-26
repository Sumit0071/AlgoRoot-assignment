// app.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use( express.json() );
const CORSOPTIONS = {
    origin: process.env.VITE_FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use( cors( CORSOPTIONS ) );
connectDB( DATABASE_URL );

app.use( '/api/users', userRoutes ); // Protect user routes
app.use( '/api/tasks', taskRoutes );   // Protect task routes

app.listen( PORT, () => console.log( `Server running at http://localhost:${PORT}` ) ); // Removed unnecessary space