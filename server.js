const express = require("express");
const session = require("express-session");
const express_handlebars = require("express-handlebars");
const path = require("path");
require("dotenv").config();
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const port = process.env.PORT || 3001;
const sess = {
    secret: "i have a secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

