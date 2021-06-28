const router = require("express").Router();
const connection = require("../config-db");

// POST /community
router.post("/", (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    res
      .status(400)
      .json({ errorMessage: "Please specify both name and image" });
  } else {
    const communityInfo = req.body;

    connection.query(
      "INSERT INTO community SET ?",
      [communityInfo],
      (err, communityResult) => {
        if (err) res.status(500).json(err);
        else {
          const communityId = communityResult.insertId;

          connection.query(
            "SELECT * FROM community WHERE id = ?",
            [communityId],
            (err, communitySelectResult) => {
              if (err) res.status(500).json(err);
              else res.status(200).json(communitySelectResult[0]);
            }
          );
        }
      }
    );
  }
});

// GET /community
router.get("/", (req, res) => {
  connection.query("SELECT * FROM community", (err, communitySelectResult) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(communitySelectResult);
  });
});

module.exports = router;
