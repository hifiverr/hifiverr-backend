const router = require("express").Router();
const connection = require("../config-db");

// GET /events/:community_id
router.get("/:community_id", (req, res) => {
  const communityId = req.params.community_id;

  connection.query(
    "SELECT events.*, users.profile_image, users.firstname, users.lastname FROM events JOIN users ON users.id = events.user_id WHERE community_id = ?",
    [communityId],
    (err, eventsByCommunityIdResults) => {
      if (err) res.status(500).json(err);
      else {
        if (eventsByCommunityIdResults.length) {
          res.status(200).json(eventsByCommunityIdResults);
        } else {
          res.status(404).json({
            errorMessage: `Event with the community id ${communityId} not found.`,
          });
        }
      }
    }
  );
});

// POST /events
router.post("/", (req, res) => {
  const eventInfo = req.body;

  connection.query(
    "INSERT INTO events SET ?",
    [eventInfo],
    (err, eventInsertResult) => {
      if (err) res.status(500).json(err);
      else {
        const eventId = eventInsertResult.insertId;

        connection.query(
          "SELECT * FROM events WHERE id = ?",
          [eventId],
          (err, eventSelectResult) => {
            if (err) res.status(500).json(err);
            else res.status(200).json(eventSelectResult[0]);
          }
        );
      }
    }
  );
});

module.exports = router;
