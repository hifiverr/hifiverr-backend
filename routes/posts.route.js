const router = require("express").Router();
const connection = require("../config-db");

// POST /posts
router.post("/", (req, res) => {
  const postInfo = req.body;

  connection.query(
    "INSERT INTO posts SET ?",
    [postInfo],
    (err, insertedPostResult) => {
      if (err) res.status(500).json(err);
      else {
        const postId = insertedPostResult.insertId;

        connection.query(
          "SELECT * FROM posts WHERE id = ?",
          [postId],
          (err, postSelectResult) => {
            if (err) res.status(500).json(err);
            else res.status(200).json(postSelectResult[0]);
          }
        );
      }
    }
  );
});

module.exports = router;
