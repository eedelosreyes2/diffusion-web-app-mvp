const express = require("express");
const os = require("os");

const app = express();

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

let lists = [
  {
    listId: 0,
    listTitle: "New Content List",
    content: [
      {
        contentId: 0,
        url: "etsy.com",
        contentTitle: "First new content",
        brainfart: "This is the first brainfart",
        category: "Fashion",
      },
      {
        contentId: 1,
        url: "spotify.com",
        contentTitle: "Second new content",
        brainfart: "This is the second brainfart",
        category: "Music",
      },
    ],
  },
  {
    listId: 1,
    listTitle: "Clothes",
    content: [
      {
        contentId: 0,
        url: "asos.com",
        contentTitle: "Fav ASOS Jacket",
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
