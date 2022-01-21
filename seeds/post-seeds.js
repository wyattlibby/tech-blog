const { Post } = require("../models");

const postData = [
	{
		title: "Baseball is awesome",
		text: "Really cool",
		user_id: 1,
	},
	{
		title: "AAAAAAAAAAAA",
		text: "BBBBBBBBBBBBBBBBBBBB",
		user_id: 2,
	},
	{
		title: "CCCCCCCCCCCCCC",
		text: "DDDDDDDDDDDDDDDDDD",
		user_id: 3,
	},
	{
		title: "EEEEEEEEEE",
		text: "FFFFFFFFFFFFFF",			
		user_id: 2,
	},
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;