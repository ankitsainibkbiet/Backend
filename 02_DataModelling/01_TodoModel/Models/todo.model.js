import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subTodo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTodo"
        }
    ]  // array of subTodo in which we have different object
}, {timestamps: true})

export const Todo = mongoose.model("Todo", todoSchema)