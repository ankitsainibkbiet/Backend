import { faker } from "@faker-js/faker"
import mysql from "mysql2"
import express from "express"
import path from "path"
import methodOverride from "method-override"
import { fileURLToPath } from "url"
import {v4 as uuidv4} from "uuid" 

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(methodOverride("_method"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "views")
app.set(path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

const randomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test_01",
  password: "SQL@FIRSTDB01"
})

app.get("/user", (req, res) => {
  let users
  const q = "SELECT * FROM user;"
  const q2 = "SELECT count(*) FROM user;"
  try {
    connection.query(q, (err, result) => {
      if (err) throw err
      users = result
    })
  } catch (err) {
    console.log(err)
  }
  try {
    connection.query(q2, (err, result) => {
      if (err) throw err
      const count = result[0]
      res.render("User.ejs", { users, count })
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/user/edit/:id", (req, res) => {
  const { id } = req.params
  const q = `SELECT * FROM user WHERE id = "${id}"` // make string of this id
  try {
    connection.query(q, (err, result) => {
      if (err) throw err
      const data = result[0]
      res.render("Edit.ejs", { data })
    })
  } catch (err) {
    console.log(err)
  }
})

app.patch("/user/edit/:id", (req, res) => {
  const { id } = req.params
  const { username: newUsername, password: newPassword } = req.body
  const q = `SELECT * FROM user WHERE id = "${id}"`
  try {
    connection.query(q, (err, result) => {
      if (err) throw err
      const data = result[0]
      if (newPassword !== data.password) {
        res.send("Wrong Password")
      } else {
        const q2 = `UPDATE user SET username = "${newUsername}" WHERE id = "${id}"`
        try {
          connection.query(q2, (err, result) => {
            if(err) throw err
            res.redirect("/user")
          })
        } catch (err) {
          console.log(err)
        }
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.get("/user/new", (req, res) => {
  res.render("New.ejs")
})

app.post("/user/new", (req, res) => {
  const {username, email, password} = req.body
  const q=`INSERT INTO user(id, username, email, password) VALUES (?, ?, ?, ?);`
  try{
    connection.query(q, [uuidv4(), username, email, password], (err, result) => {
      if(err) throw err
      res.redirect("/user")
    })
  }catch(err){
    console.log(err)
  }
})

app.delete("/user/:id", (req, res) => {
  const { id } = req.params
  const q = `DELETE FROM user WHERE id = "${id}";`
  try{
    connection.query(q, (err, result) => {
      if(err) throw err
      res.redirect("/user")
    })
  }catch(err){
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`app is listening on the port no ${port}`)
})