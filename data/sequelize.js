const { Sequelize } = require("sequelize");


module.exports = new Sequelize(
    {
        dialect:'sqlite',
        storage: __dirname + '/foodgram.sqlite'
    }
)