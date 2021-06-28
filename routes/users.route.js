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

module.exports = router;
