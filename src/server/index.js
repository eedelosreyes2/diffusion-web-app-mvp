const express = require("express");
const os = require("os");

const app = express();

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

let lists = [
  {
    id: 0,
    title: "New Content List",
    content: [
      {
        id: 0,
        url: "etsy.com",
        title: "First new content",
        brainfart: "This is the first brainfart",
        category: "Fashion",
      },
      {
        id: 1,
        url: "spotify.com",
        title: "Second new content",
        brainfart: "This is the second brainfart",
        category: "Music",
      },
    ],
  },
  {
    id: 1,
    title: "Clothes",
    content: [
      {
        id: 0,
        url: "asos.com",
        title: "Fav ASOS Jacket",
        brainfart: "I love this jacket omg",
        category: "Fashion",
      },
    ],
  },
];

app.get("/api/getLists", (req, res) => res.send({ lists }));

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
