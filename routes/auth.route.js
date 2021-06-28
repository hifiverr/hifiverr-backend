const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config-db");

// POST /register
router.post("/register", (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    skills,
    location,
    primary_language,
    profile_image,
    about_me,
  } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Please specify both email and password" });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    const userInfo = {
      firstname,
      lastname,
      email,
      password: hash,
      skills,
      location,
      primary_language,
      profile_image,
      about_me,
    };

    connection.query(`INSERT INTO users SET ?`, [userInfo], (error, result) => {
      if (error) {
        res.status(500).json({ errorMessage: error.message });
      } else {
        res.status(201).json({
          id: result.insertId,
          ...userInfo,
          password: "hidden",
        });
      }
    });
  }
});

// POST /login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Please specify both email and password" });
  } else {
    connection.query(
      `SELECT * FROM users WHERE email=?`,
      [email],
      (error, result) => {
        if (error) {
          res.status(500).json({ errorMessage: error.message });
        } else if (result.length === 0) {
          res.status(403).json({ errorMessage: "Invalid email" });
        } else if (bcrypt.compareSync(password, result[0].password)) {
          // Passwords match
          const user = {
            id: result[0].id,
            email,
            password: "hidden",
          };
          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_AUTH_SECRET
            //     , {
            //   expiresIn: 300,
            // }
          );
          res.status(200).json({ user, token });
        } else {
          // Passwords don't match
          res.status(403).json({ errorMessage: "Invalid password" });
        }
      }
    );
  }
});

// Token middleware
const authenticateWithJsonWebToken = (req, res, next) => {
  if (req.headers.authorization !== undefined) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ errorMessage: "you're not allowed to access these data" });
      } else {
        req.user_id = decoded.id;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ errorMessage: "you're not allowed to access these data" });
  }
};

router.get("/verify-token", authenticateWithJsonWebToken, (req, res) => {
  const user_id = req.user_id;
  connection.query(
    "SELECT * FROM users WHERE users.id = ?",
    [user_id],
    (err, results) => {
      if (err) res.status(500).send(err);
      else res.status(200).send({ ...results[0], password: "hidden" });
    }
  );
});

module.exports = router;
