import express from "express"
import flash from "connect-flash"
import session from "express-session"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const port = 3000

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

app.use(flash())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use((req, res, next) => { // alternate of sending this in res.render
    res.locals.success = req.flash("success") 
    res.locals.error = req.flash("error") 
    next()
})

app.get("/register", (req, res) => {
    let { name = "anonymus" } = req.query
    req.session.name = name
    if(name == "anonymus"){
        req.flash("error", "user register failed")  // should be away from where we are using it
    }else{
        req.flash("success", "user loggedIN successful")  
    }
    res.redirect("/users")
})

app.get("/users", (req, res) => {
    res.render("Hello.ejs", { name: req.session.name })
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

