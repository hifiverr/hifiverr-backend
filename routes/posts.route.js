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
          "SELECT posts.*, users.profile_image FROM posts JOIN users ON users.id = posts.user_id WHERE posts.id = ?",
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

// GET /posts?community_id=3
router.get("/", (req, res) => {
  const { community_id } = req.query;

  connection.query(
    "SELECT posts.*, users.profile_image FROM posts JOIN users ON users.id = posts.user_id WHERE posts.community_id = ?",
    [community_id],
    (err, postSelectResult) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(postSelectResult);
    }
  );
});

// GET /posts/1/comments
router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;

  connection.query(
    "SELECT comments.*, users.profile_image FROM comments JOIN users ON users.id = comments.user_id WHERE comments.post_id = ?",
    [postId],
    (err, postSelectResult) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(postSelectResult);
    }
  );
});

module.exports = router;
