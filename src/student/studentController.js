const { Student } = require('./studentModel');
const { Mark } = require('./markModel');
const { ClassSubject } = require('./classSubjectModel');
const { Class } = require('./classModel');
const { Subject } = require('./subjectModel');

class StudentController {

    /**
     * Get the Students list with Marks
     * @returns 
     */
    static async getStudents() {
        try {
            const students = await Student.findAll({
                include: {
                    model: Mark,
                    required: true,
                    include: {
                        model: ClassSubject,
                        required: true,
                        include: [
                            {
                                model: Class
                            },
                            {
                                model: Subject
                            }
                        ]
                    }
                }
            });

            return {
                status: 200,
                data: { students }
            };
        } catch (err) {
            return this.handleError(err);
        }
    }

    /**
     * Get the Students list with Marks
     * @returns 
     */
    static async getStudentByID(id) {
        try {
            const student = await Student.findOne({
                where: {
                    id: id
                },
                include: {
                    model: Mark,
                    required: true,
                    include: {
                        model: ClassSubject,
                        required: true,
                        include: [
                            {
                                model: Class
                            },
                            {
                                model: Subject
                            }
                        ]
                    }
                }
            });

            if (!student) {
                return {
                    status: 404,
                    data: {
                        message: "Student does not exists!"
                    }
                };
            }

            return {
                status: 200,
                data: { student }
            };
        } catch (err) {
            return this.handleError(err);
        }
    }

    /**
     * Save the Student
     * @param {*} data 
     * @returns 
     */
    static async saveStudent(data) {
        try {
            const studentData = {
                firstName: data.firstName,
                lastName: data.lastName,
                marks: data.marks
            };

            const student = await Student.create(studentData, {
                include: [Mark]
            });

            return {
                status: 200,
                data: { student }
            };
        } catch (err) {
            return this.handleError(err);
        }
    }

    /**
     * Update the Student
     * @param {*} data 
     * @returns 
     */
    static async updateStudent(id, data) {
        try {
            const student = await Student.findByPk(id);

            if (!student) {
                return {
                    status: 404,
                    data: {
                        message: "Student does not exists!"
                    }
                };
            }

            // Update Student
            student.firstName = data.firstName;
            student.lastName = data.lastName;
            await student.save();

            // Update Marks
            let marks = data.marks.map((mark) => {
                return {
                    classSubjectId: mark.classSubjectId,
                    marks: mark.marks,
                    studentId: student.id
                };
            });

            await Mark.destroy({
                where: {
                    studentId: student.id
                }
            });
            await Mark.bulkCreate(marks);

            return {
                status: 200,
                data: {
                    message: "Student has been updated successfully!"
                }
            };
        } catch (err) {
            return this.handleError(err);
        }
    }

    /**
     * Delete the Student
     * @param {*} data 
     * @returns 
     */
    static async deleteStudent(id) {
        try {
            const student = await Student.findByPk(id);
            if (!student) {
                return {
                    status: 404,
                    data: {
                        message: "Student does not exists!"
                    }
                };
            }

            await Mark.destroy({
                where: {
                    studentId: id
                }
            });
            await student.destroy();

            return {
                status: 200,
                data: {
                    message: "Student has been deleted successfully!"
                }
            };
        } catch (err) {
            return this.handleError(err);
        }
    }

    /**
     * Get the classes dropdown
     */
    static async getClasses() {
        try {
            const classes = await Class.findAll({});
            return {
                status: 200,
                data: { classes }
            };
        } catch (err) {
            return this.handleError(err);
        }
    }

    /**
     * Get the Subjects by Class ID
     * @param {*} classId Class ID
     * @returns 
     */
    static async getSubjects(classId) {
        const subjects = await ClassSubject.findAll({
            where: {
                classId: classId,
            },
            include: [
                {
                    model: Subject
                }
            ]
        });

        return {
            status: 200,
            data: { subjects }
        };
    }

    /**
     * Handle the error
     * @param {*} err Error
     * @returns 
     */
    static handleError(err) {
        return {
            status: 400,
            data: {
                message: err.message
            }
        };
    }
}

module.exports = StudentController;
