import express from "express"

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/login', (req, res) => {
    let {User, Password} = req.query
    res.send(`Get form accepted, welcome ${User}`)
})

app.post('/login', (req, res) => {
    let {User, Password} = req.body
    res.send(`Post form accepted, welcome ${User}`)
})

app.listen(port, () => {
    console.log(`app is listening at ${port}`)
})