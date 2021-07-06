const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello to my API serving at PORT : " + PORT);
});

app.post("/createpost", (req, res) => {
  const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    port: process.env.MYSQL_PORT,
  });

  db.connect((err) => {
    if (err) throw err;
    console.log("Database Connected...");

    const { sensor, location, value1, value2, value3 } = req.query;

    let sql = `INSERT INTO SensorData (sensor, location, value1, value2, value3) VALUES ('${sensor}', '${location}', '${value1}', '${value2}', '${value3}')`;

    let query = db.query(sql, (err, result) => {
      db.end();

      if (err) throw err;

      console.log(result);

      res.json({ msg: "Post added" });
    });
  });
});

// PORT

app.listen(PORT, () => console.log("server started on PORT : " + PORT));
