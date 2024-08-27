const { DataTypes } = require("sequelize")
const { connection } = require("../database/connection")



const User = connection.define('user', {
    name: {
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
})

module.exports = User