import mongoose from "mongoose";

const connection = (async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/test')
        console.log("Connection Established !")
    }catch(err){
        console.log(err)
    }
})();

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String
})

const User = mongoose.model("User", userSchema)

const user1 = new User({name: "Ankit", age: 21, email: "ankit@gmail.com"})

user1.save()

User.insertMany([
    {name: "Amit", age: 18, email: "amit@gmail.com"},
    {name: "Akash", age: 41, email: "Akash@gmail.com"},
    {name: "Hemant", age: 91, email: "Hemant@gmail.com"},
])

User.findOne({ age: {$gt: 21}})
.then(res => {
    console.log(res)
})