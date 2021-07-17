var express = require('express');
var router = express.Router();

const StudentController = require('./studentController');

// Get the Classes
router.get('/classes', async (req, res, next) => {
    try {
        const result = await StudentController.getClasses();
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

// Get Subjects by Class ID
router.get('/subjects/:id', async (req, res, next) => {
    try {
        const result = await StudentController.getSubjects(req.params.id);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

// Add Student
router.post('/', async (req, res, next) => {
    try {
        const result = await StudentController.saveStudent(req.body);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

// Get list of students
router.get('/', async (req, res, next) => {
    try {
        const result = await StudentController.getStudents();
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

// Get list of students
router.get('/student/:id', async (req, res, next) => {
    try {
        const result = await StudentController.getStudentByID(req.params.id);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

// Update Student
router.put('/:id', async (req, res, next) => {
    try {
        const result = await StudentController.updateStudent(req.params.id, req.body);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

// Delete Student
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await StudentController.deleteStudent(req.params.id);
        res.status(result.status).send(result.data);
    } catch (error) {
        res.status(error.status || 400).send(error.data);
    }
});

module.exports = router;