import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import data from './Data.json' with { type: 'json' };

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "/public")))

app.get("/", (req, res) => {
    res.render("Home.ejs")
})

app.get("/rolldice", (req, res) => {
    let diceNum = Math.floor(Math.random()*6 + 1)
    res.render("RollDice.ejs", { diceNum })
})

app.get("/instagram/:id", (req, res) => {
    const follower = ["adam", "eva", "sam", "willliam"]
    let { id } = req.params
    let dataReq = data[id]
    res.render("Instagram", { id,  dataReq})
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})