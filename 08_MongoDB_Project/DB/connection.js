import mongoose from "mongoose";

const connection = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Post');
        console.log("Database Connected !")
    }catch(err){
        console.log(err)
    }
}

const postSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Post = mongoose.model("Post", postSchema)

export {connection,  Post};  // await is requierd with these promises 
