const router = require("express").Router();
const connection = require("../config-db");

// POST /comments
router.post("/", (req, res) => {
  const commentInfo = req.body;

  connection.query(
    "INSERT INTO comments SET ?",
    [commentInfo],
    (err, insertedCommentResult) => {
      if (err) res.status(500).json(err);
      else {
        const commentId = insertedCommentResult.insertId;

        connection.query(
          "SELECT * FROM comments WHERE id = ?",
          [commentId],
          (err, commentSelectResult) => {
            if (err) res.status(500).json(err);
            else res.status(200).json(commentSelectResult[0]);
          }
        );
      }
    }
  );
});

module.exports = router;
