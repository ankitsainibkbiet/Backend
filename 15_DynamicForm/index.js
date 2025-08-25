import express from "express"
import mysql from "mysql2"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "form",
//   password: "SQL@FIRSTDB01"
// })

app.get("/form", (req, res) => {
  res.render("Form.ejs")
})

app.post("/form/submit", (req, res) => {
  const { name, password } = req.body
  const extra = req.body.extra
  const q1 = `INSERT INTO user(name, password) VALUES (?, ?)`
  connection.query(q1, [name, password], (err, result) => {
    if (err) console.log("Error occurs in user Database", err.message)
    let userId = result.insertId

    if (!extra) {
      return res.send("<h1>Form Submitted !<h1/>")
    }

    const q2 = `INSERT INTO userinfo(user_id, value) VALUES (?, ?)`
    extra.forEach((items) => {
      connection.query(q2, [userId, items], (err, result) => {
        if (err) console.log("Error occurs in userinfo Database", err.message)
      })
    })

    res.send("<h1>Form Submitted !<h1/>")
  })
})

app.listen(port, () => {
  console.log("app is listening on port 3000")
})