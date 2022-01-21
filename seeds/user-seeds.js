const { User } = require("../models");

const userData = [
	{
		username: "Allan",
		email: "Allan@gmail.com",
		password: "password123",
	},
	{
		username: "Ian",
		email: "Ian@gmail.com",
		password: "password1234",
	},
	{
		username: "Bob",
		email: "Bob@gmail.com",
		password: "bob!27",
	},
	{
		username: "Carl",
		email: "Carl@gmail.com",
		password: "123456",
	},
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers