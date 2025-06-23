import express from "express"
import cookieParser from "cookie-parser"

const app = express()
app.use(cookieParser("SecretCode"))

app.get("/", (req, res) => {
    res.send("Server is working")
    const x = req.cookies  // to parse(read) cookies we need cookie-parser
    console.log(x)
})

app.get("/cookies", (req, res) => {
    res.cookie("name", "Ankit", {signed: true })
    res.send("cookies recieved")
})

app.get("/user", (req, res) => {
    let { name = "anonymous" } = req.signedCookies
    res.send(name)
})

app.listen(3000, () => {
    console.log("app is listening on port 3000")
})