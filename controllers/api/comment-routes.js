const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// GET /api/comments
router.get("/", (req, res) => {
	Comment.findAll({
		attributes: ["id", "text", "user_id", "post_id"],
	})
		.then((dbCommentData) => res.json(dbCommentData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/comments
router.post("/", withAuth, (req, res) => {
	if (req.session) {
		Comment.create({
			text: req.body.text,
			post_id: req.body.post_id,
			user_id: req.session.user_id,
		})
			.then((dbCommentData) => res.json(dbCommentData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	}
});

// DELETE /api/comments/1
router.delete("/:id", withAuth, (req, res) => {
	Comment.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: "No comment for this id" });
				return;
			}
			res.json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;