import express from "express"
import session from "express-session"
import { User, connection } from "./connection.js"
import passport from "passport"
import LocalStrategy from "passport-local"

await connection()
const app = express()

app.use(session({
    secret: "MySecretCode",
    resave: false,
    saveUninitialized: true
}))

// Passport Setup :-
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// CreateUser :-
app.get("/user", async(req, res, next) => {
    try{
            let user1 = new User({
            email: "user1@gmail.com",
            username: "user1"
        })
        const result = await User.register(user1, "helloWorld")
        res.send(result)
    }catch(err){
        console.log(err)
        next(err)
    }
})

User.findById("68595a1feb4bd0bd892ecb8f")
.then(res => {console.log(res)})
.catch(err => {console.log(err)})

app.use((err, req, res, next) => {
    res.send(err.message)
})

app.listen(3000, () => {
    console.log("app is listening on port 3000")
})