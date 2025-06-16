import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import {v4 as uuidv4} from "uuid"
import methodOverride from "method-override"

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"))

let data = [
  {
    id: uuidv4(),
    author: "Ankit Saini",
    content:
      "Learning web development is a journey filled with challenges. Every bug you fix makes you a better problem solver. Stay curious and keep building projects.",
  },
  {
    id: uuidv4(),
    author: "Adam",
    content:
      "Tailwind CSS makes styling so much faster and cleaner. Utility classes help you avoid writing custom CSS. It’s perfect for rapid UI prototyping.",
  },
  {
    id: uuidv4(),
    author: "Sam",
    content: "EJS allows dynamic content rendering in your HTML. Combining it with Node.js creates powerful web apps. Always close your loop tags correctly in templates.",
  },
  {
    id: uuidv4(),
    author: "Eva",
    content: "Debugging is a core skill in development.Use `console.log()` to trace the flow of your app.Take breaks to approach problems with a fresh mind",
  }
];

app.get("/post", (req, res) => {
  res.render("Post", { data });
});

app.get("/post/new", (req, res) => {
  res.render("PostForm");
});

app.post("/post", (req, res) => {
  const { author, content } = req.body;
  data.push({ id: uuidv4(), author, content });
  res.redirect("/post");
});

app.get("/post/:id", (req, res) => {
  let { id } = req.params
  const reqData = data.find((post) => post.id === id)
  res.render("CurrentPost", { data: reqData })
})

app.get("/post/edit/:id", (req, res) => {
  let { id } = req.params
  const reqData = data.find((post) => post.id === id)
  res.render("EditPost", { data: reqData })
})

app.patch("/post/:id", (req, res) => {
  const { id } = req.params
  const newContent = req.body.content
  const reqData = data.find((post) => post.id === id)
  reqData.content = newContent
  res.redirect("/post")
})

app.delete("/post/:id", (req, res) => {
  const { id } = req.params
  data = data.filter((post) => post.id != id)
  res.redirect("/post")
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
