const { Comment } = require("../models");

const commentData = [
	{
		text: "GGGGGGGGGG",
		user_id: 1,
		post_id: 1,
	},
	{
		text: "HHHHHHHHHHH",
		user_id: 2,
		post_id: 2,
	},
	{
		text: "IIIIIIIIIII",
		user_id: 3,
		post_id: 4,
	},
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;