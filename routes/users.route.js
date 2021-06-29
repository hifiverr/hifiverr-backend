const router = require("express").Router();
const connection = require("../config-db");

// PUT /users/:id
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const userInfo = req.body;

  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, userSelectResults) => {
      if (err) res.status(500).json(err);
      else {
        if (userSelectResults.length) {
          connection.query(
            "UPDATE users SET ? WHERE id = ?",
            [userInfo, userId],
            (err, updatedUserResults) => {
              if (err) res.status(500).json(err);
              else {
                const updatedUser = { ...userSelectResults[0], ...userInfo };

                res.status(200).json(updatedUser);
              }
            }
          );
        } else
          res
            .status(404)
            .json({ errorMessage: `User with the id ${userId} not found.` });
      }
    }
  );
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const userId = req.params.id;

  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, userSelectResult) => {
      if (err) res.status(500).json(err);
      else {
        if (userSelectResult.length) {
          res.status(200).json(userSelectResult[0]);
        } else
          res
            .status(404)
            .json({ errorMessage: `User with id ${userId} not found.` });
      }
    }
  );
});

// GET /users
router.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, usersSelectResult) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(usersSelectResult);
  });
});

module.exports = router;
