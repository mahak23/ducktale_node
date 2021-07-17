const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../../dbConnection");
const { Subject } = require('./subjectModel');
const { Class } = require('./classModel');

class ClassSubject extends Model { };

ClassSubject.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'class_subject',
    timestamps: false
});

//create table if not exist
ClassSubject.sync({}).then(() => { });
ClassSubject.belongsTo(Subject);
ClassSubject.belongsTo(Class);

module.exports = {
    ClassSubject,
};