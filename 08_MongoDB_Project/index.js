import path from "path"
import express from "express"
import methodOverride from "method-override"
import { fileURLToPath } from "url"
import {connection, Post} from "./DB/connection.js"

const app = express()
const port = 3000
await connection()

app.use(express.json())
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

app.get("/post", (req, res) => {  // this should be rap in then and catch or in async await
    let data
    Post.find({})
    .then((result) => {
        res.render("Post.ejs", {data: result})
    }).catch((err) => {
        console.log(err)
    })
})

app.get("/post/edit/:id", (req, res) => {
    const { id } = req.params
    Post.findById(id)
    .then((result) => {
        res.render("EditPost.ejs", {data: result})
    }).catch((err) => {
        console.log(err)
    })
})

app.get("/post/new", (req, res) => {
    res.render("PostForm.ejs")
})

app.post("/post", async(req, res) => { 
    const {username: newUsername, content: newContent} = req.body
    const newPost = new Post({
        username: newUsername,
        content: newContent
    })
    await newPost.save()
    res.redirect("/post")
})

app.put("/post/:id", (req, res) => {
    const { id } = req.params
    const {content : newContent} = req.body
    Post.findByIdAndUpdate(id, {content: newContent})
    .then((result) => {
        res.redirect("/post")
    }).catch((err) => {
        console.log(err)
    })
})

app.get("/post/:id", (req, res) => {
    const { id } = req.params
    console.log("hello")
    Post.findById(id)
    .then(result => {
        res.render("CurrentPost.ejs", {data: result})
    }).catch(err => {
        console.log(err)
    })
})

app.delete("/post/:id", (req, res) => {
    const { id } = req.params
    console.log("hello")
    Post.findByIdAndDelete(id)
    .then(result => {
        res.redirect("/post")
    }).catch(err => {
        console.log(err)
    })
})

app.listen(port, () => {
    console.log(`app is listening on the port ${port}`)
})