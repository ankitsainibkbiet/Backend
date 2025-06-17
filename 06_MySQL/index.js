import { faker } from "@faker-js/faker"
import mysql from "mysql2"

const randomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

let data = []
for (let i = 0; i <= 100; i++) {
  data.push(randomUser())
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test_01",
  password: "SQL@FIRSTDB01"
})

const q = "INSERT INTO user(id, username, email, password) VALUES ?;"  // write placeholder outside brackets

try {
  connection.query(q, [data], (error, results) => { // use the brackets for multiple values
    if (error) throw error;
    console.log(results)
  })
} catch (error) {
  console.log(error)
}

connection.end()
