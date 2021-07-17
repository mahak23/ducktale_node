const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../../dbConnection");
const { ClassSubject } = require('./classSubjectModel');

class Mark extends Model { };

Mark.init({
    // attributes
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    classSubjectId: {
        type: DataTypes.INTEGER,
    },
    studentId: {
        type: DataTypes.INTEGER,
    },
    marks: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    modelName: 'marks',
    timestamps: false
});

//create table if not exist
Mark.sync({}).then(() => { });
Mark.belongsTo(ClassSubject);

module.exports = {
    Mark,
};