const router = require("express").Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// GET /api/posts
router.get("/", (req, res) => {
	console.log(req.session);
	Post.findAll({
		order: [["created_at", "DESC"]],
		attributes: ["id", "title", "text", "created_at"],
		include: [
			{
				// includes comment data in this /api/post GET request. Will need all this data for front end
				model: Comment,
				attributes: ["id", "text", "post_id", "created_at"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbPostData) => res.json(dbPostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /api/posts/1
router.get("/:id", (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
		attributes: ["id", "title", "text", "created_at"],
		include: [
			{
				model: Comment,
				attributes: ["id", "text", "post_id", "created_at"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found for this id" });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/posts
router.post("/", withAuth, (req, res) => {
	Post.create({
		title: req.body.title,
		text: req.body.text,
		user_id: req.session.user_id,
	})
		.then((dbPostData) => res.json(dbPostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// PUT /api/posts/1
router.put("/:id", withAuth, (req, res) => {
	Post.update(
		{
			title: req.body.title,
			text: req.body.text
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found for this id" });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE /api/posts/1
router.delete("/:id", withAuth, (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found for this id" });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;