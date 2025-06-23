import express from "express"

const app = express()
const port = 3000

app.use((req, res, next) => {  // this will work for all routes
    const dateOnly = new Date().toISOString().slice(0,10);
    req.date = dateOnly;
    console.log(`${req.url}, ${req.method}, ${req.date}`)
    next()
})

app.use("/check/2", (req, res, next) => {
    console.log("specific path middleWare")
    next()  // important
})

app.use("/admin", (req, res, next) => {
    let { password } = req.query
    if(password == "hello"){
        next()
    }else{
        res.send("Not Authorized")
    }
})

app.get("/admin", (req, res) => {
    res.send("LoggedIn")
})

app.get("/check", (req, res) => {
    res.send("Server is Working")
})

app.get("/check/2", (req, res) => {
    res.send("check 2 route")
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})