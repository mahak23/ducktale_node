const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../../dbConnection");

class Class extends Model { };

Class.init({
    // attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(500),
        allowNull: true,
        default: ''
    },
}, {
    sequelize,
    modelName: 'classes',
    timestamps: true
});

//create table if not exist
Class.sync({}).then(() => { });

module.exports = {
    Class,
};