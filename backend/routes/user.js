var express = require("express");
var router = express.Router();
var md5 = require("md5");
var jwt = require("jsonwebtoken");
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "blog",
  insecureAuth: true,
});

con.connect(function (err) {
  if (err) throw err;

  console.log("Connection Successful");
});

router.post("/register", async function (req, res, next) {
  try {
    let { username, email, password } = req.body;
    const hashed_password = md5(password.toString());
    const checkUsername = `Select username FROM users WHERE username = ?`;
    const checkId = `Select id FROM users WHERE username = ?`;

    con.query(checkUsername, [username], (err, result, fields) => {
      if (!result.length) {
        const sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`;
        con.query(
          sql,
          [username, email, hashed_password],
          (err, result, fields) => {
            if (err) {
              res.send({ status: 0, data: err });
            } else {
              let token = jwt.sign({ data: result }, "secret");
              res.send({ status: 1, data: result, token: token });
            }
          }
        );
      }
    });
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    const hashed_password = md5(password.toString());
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    con.query(sql, [username, hashed_password], function (err, result, fields) {
      if (err) {
        res.send({ status: 0, data: err });
      } else {
        let token = jwt.sign({ data: result }, "secret");
        res.send({ status: 1, data: result, token: token });
      }
    });
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post("/addBlog", async function (req, res, next) {
  try {
    let { username, email, password, blogName } = req.body;
    const checkId = `Select id FROM users WHERE username = ?`;

    con.query(checkId, [username], (err, result, fields) => {
      if (result.length) {
        console.log("userId", result[0].id);
        const sql = `Insert Into blogs (blogName, userId) VALUES ( ?, ?)`;
        con.query(sql, [blogName, result[0].id], (err, result, fields) => {
          if (err) {
            res.send({ status: 0, data: err });
          } else {
            let token = jwt.sign({ data: result }, "secret");
            res.send({ status: 1, data: result, token: token });
          }
        });
      }
    });
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post("/getCategories", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    const hashed_password = md5(password.toString());
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    con.query(sql, [username, hashed_password], function (err, result, fields) {
      if (err) {
        res.send({ status: 0, data: err });
      } else {
        let token = jwt.sign({ data: result }, "secret");
        res.send({ status: 1, data: result, token: token });
      }
    });
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

module.exports = router;
