const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../../dbConnection");
const { Mark } = require('./markModel');

class Student extends Model { };

Student.init({
    // attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(500),
        allowNull: true,
        default: ''
    },
    lastName: {
        type: DataTypes.STRING(500),
        allowNull: true,
        default: ''
    },
}, {
    sequelize,
    modelName: 'students',
    timestamps: true
});

//create table if not exist
Student.sync({}).then(() => { });
Student.hasMany(Mark);

module.exports = {
    Student,
};