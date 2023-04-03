const Keys = require("./keys");

// Express Application Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool ({
    user: Keys.pgUser,
    host: Keys.pgHost,
    database: Keys.pgDatabase,
    password: Keys.pgPassword,
    ports: Keys.pgPort
});

pgClient.on("connect", client => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch(err => console.log("PG ERROR", err));
});

//Express route definitions
app.get("/", (req, res) => {
    res.send("Chukwuebuka");
})

// get the values
app.get("/values/all", async(req, res) => {
    const values = await pgClient.query("SELECTV = FROM values");

    res.send(values);
});

// now the post -> insert value
app.post("/values", async (req,res) => {    
  if (!req.bodyParser.value) res.send({ working: false});

    pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]);

    res.send({ working: true});
});

app.listen(5000, err => {
    console.log("listening on port 5000");
});

