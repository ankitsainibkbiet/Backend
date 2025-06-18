import { faker } from "@faker-js/faker"
import mysql from "mysql2"
import express from "express"
import path from "path"
import methodOverride from "method-override"
import { fileURLToPath } from "url"

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
  const q = "SELECT * FROM user;"
  try {
    connection.query(q, (err, result) => {
      if (err) throw err
      const users = result
      res.render("User.ejs", { users })
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

app.listen(port, () => {
  console.log(`app is listening on the port no ${port}`)
})