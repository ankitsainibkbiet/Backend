import express from "express"
import session from "express-session"

const app = express()

app.use(session({
    secret: "SecretCode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 10*24*60*60*100,
        maxAge: 10*24*60*60*100
    }
}))

app.get("/", (req, res) => {
    res.send("Server is working")
})

app.get("/user", (req, res) => {
    let { name } = req.query
    req.session.name = name;  // session has it's own cookies
    res.redirect("/greet")
})

app.get("/greet", (req, res) => {
    res.send(`<h1>Hello, ${req.session.name}</h1>`)
})

app.listen(3000, () => {
    console.log("app is listening on port 3000")
})