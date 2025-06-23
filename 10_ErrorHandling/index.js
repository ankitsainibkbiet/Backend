import express from "express"
import ExpressError from "./CustomExpressError.js"

const port = 3000
const app = express()

const checkAdmin = (req, res, next) => {
    let { password } = req.query
    if(password == "helloWorld"){
        return next()
    }else{
        throw new ExpressError(403, "Not Authorized")
    }
}

// express byDefault did not send async error so use next()

app.get("/admin", checkAdmin, (req, res) => {
    res.send("LoggedIN")
})

app.get("/err", (req, res) => {
    abcd = abcd
})

app.use((err, req, res, next) => {  // error handling middleware must have 4 parameters
    let { status = 500, message = "Something went Wrong !" } = err
    res.status(status).send(message)
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})