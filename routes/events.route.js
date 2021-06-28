const router = require("express").Router();
const connection = require("../config-db");

// GET /events/:community_id
router.get("/:community_id", (req, res) => {
  const communityId = req.params.community_id;

  connection.query(
    "SELECT * FROM events WHERE community_id = ?",
    [communityId],
    (err, eventsByCommunityIdResults) => {
      if (err) res.status(500).json(err);
      else {
        if (eventsByCommunityIdResults.length) {
          res.status(200).json(eventsByCommunityIdResults[0]);
        } else {
          res.status(404).json({
            errorMessage: `Event with the community id ${communityId} not found.`,
          });
        }
      }
    }
  );
});

module.exports = router;
