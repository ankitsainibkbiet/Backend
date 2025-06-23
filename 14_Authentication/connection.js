import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const connection = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/User');
        console.log("Database Connected !")
    }catch(err){
        console.log(err)
    }
}

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema)

export {User, connection}