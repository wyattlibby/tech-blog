const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if(process.env.JAWSDB_URL){
    sequelize=new Sequelize(process.env.JAWSDB_URL);
}
else{
    let options = {
        host:"localhost",
        dialect:"mysql",
        port: 3306
    };
    sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PW,options);
}

module.exports=sequelize;