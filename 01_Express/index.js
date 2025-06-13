import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()
const port = 3000


app.get('/', (req, res) => {
    res.send("Hello Backend !")
})

app.get('/leetcode', (req, res) => {
    res.send("AnkitSainiLeetCode")
})

app.get('/github', (req, res) => {
    res.send('<h1>ankitsainibkbiet</h1>')
})

app.listen(process.env.port, () => {
    console.log(`app is listening on port no ${process.env.port}`)
})