const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../../dbConnection");

class Subject extends Model { };

Subject.init({
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
    modelName: 'subjects',
    timestamps: true
});

//create table if not exist
Subject.sync({}).then(() => { });

module.exports = {
    Subject,
};