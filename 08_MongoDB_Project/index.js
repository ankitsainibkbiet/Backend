import path from "path"
import express from "express"
import methodOverride from "method-override"
import {connection, Post} from "./DB/connection.js"

const app = express()
const port = 3000
await connection()



app.get("/post", (req, res) => {
    res.send("Working")
})

app.listen(port, () => {
    console.log(`app is listening on the port ${port}`)
})