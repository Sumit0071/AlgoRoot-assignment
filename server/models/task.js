import mongoose from "mongoose";
const taskSchema = new mongoose.Schema( {
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false, required: true },
    completedBy: { type: String }
} )
const task = mongoose.model( 'task', taskSchema );
export default task