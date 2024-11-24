var express = require('express');
var app = express();

app.use(express.json());

let students = [
    { id: 1, name: 'John', age: 18 },
    { id: 2, name: 'Johnathan', age: 20 },
    { id: 3, name: 'Sarah', age: 22 },
];

// Get all students
app.get('/students', function (request, response) {
    response.json(students);
});

// Get a student by ID
app.get('/students/:id', function (request, response) {
    let id = parseInt(request.params.id);
    let student = students.find(s => s.id === id);
    if (student) {
        response.json(student);
    } else {
        response.status(404).send('Student not found');
    }
});

// Add a new student
app.post('/students', function (request, response) {
    let newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1, // Auto-increment ID
        name: request.body.name,
        age: request.body.age
    };

    if (!newStudent.name || !newStudent.age) {
        return response.status(400).send('Name and age are required');
    }

    students.push(newStudent);
    response.status(201).json(newStudent);
});

// Edit a student
app.put('/students/:id', function (request, response) {
    let id = parseInt(request.params.id);
    let student = students.find(s => s.id === id);

    if (student) {
        if (request.body.name) student.name = request.body.name;
        if (request.body.age) student.age = request.body.age;

        response.json(student);
    } else {
        response.status(404).send('Student not found');
    }
});

// Delete a student
app.delete('/students/:id', function (request, response) {
    let id = parseInt(request.params.id);
    let index = students.findIndex(s => s.id === id);

    if (index !== -1) {
        let deletedStudent = students.splice(index, 1);
        response.json(deletedStudent);
    } else {
        response.status(404).send('Student not found');
    }
});

// Start the server
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
