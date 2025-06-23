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
    saveUninitialized: true
}))

app.use(flash())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/user", (req, res) => {
    let { name } = req.query
    res.send("Hello.ejs", { name })
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})