const express = require("express");
const session = require("express-session");
const express_handlebars = require("express-handlebars");
require("dotenv").config();
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
    secret: "i have a secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
    db: sequelize
    })
};

app.use(session(sess));
const helpers = require("./utils/helpers");
const handlebars = express_handlebars.create({helpers});
app.engine("handlebars", handlebars.engine);
app.set("view engine","handlebars");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(require("./controllers"));
sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log(`now listening on ${PORT}`));
});

