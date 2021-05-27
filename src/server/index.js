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
    title: "first",
    brainfart: "this is the brainfart",
    category: "fashion",
  },
];

app.get("/api/getLists", (req, res) => res.send({ lists }));

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
