const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
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

// app.get("/api", (req, res) => res.json({ lists }));
// app.get("/api", (req, res) => res.json({ lists }));

// app.use("/", router);

// app.listen(process.env.PORT || 8080, () =>
//   console.log(`Listening on port ${process.env.PORT || 8080}!`)
// );



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.APIKEY,
//   authDomain: process.env.AUTHDOMAIN,
//   projectId: process.env.PROJECTID,
//   storageBucket: process.env.SOTRAGEBUCKET,
//   messagingSenderId: process.env.MESSAGINGSENDERID,
//   appId: process.env.APPID,
//   measurementId: process.env.MEASUREMENTID,
// };
