const path = require("path");
const express = require("express");
const cors = require("cors");
const legoSetsRouter = require("./routes/legoSets/legoSets.router");
const missingPiecesRouter = require("./routes/missingPieces/missingPieces.router.js");
const db = require("./database/dbconfig");

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

let maxTries = 1;
let delay = 3000;
let tryCount = 0;

function reconnect() {
  db.connect((error, connection) => {
    if (error) {
      console.log(error);
      console.log("Error connecting to database. Attempt: " + (tryCount + 1));
      if (tryCount >= maxTries) {
        throw new Error("Max tries reached. Giving up.");
      }
      tryCount++;
      setTimeout(reconnect, delay);
    } else {
      console.log("db connected");
    }
  });
}

reconnect();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", legoSetsRouter);
app.use("/api", missingPiecesRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
