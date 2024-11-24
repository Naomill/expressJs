const express = require('express'); // Import express
const app = express(); // Create an instance of express
app.use(express.json()); // Middleware to parse JSON bodies

const cors = require('cors');
app.use(cors());

// Mock database
let students = [
    { id: 1, name: 'John', lastName: 'Doe' },
    { id: 2, name: 'Jane', lastName: 'Smith' },
    { id: 3, name: 'Naomill', lastName: '69' }
];

// Get all students
app.get('/students', (req, res) => res.json(students));

// Get a student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Add a new student
app.post('/students', (req, res) => {
    const { name, lastName } = req.body;
    if (!name || !lastName) {
        return res.status(400).json({ error: 'Name and LastName are required' });
    }
    const newStudent = { id: students.length + 1, name, lastName };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Update a student by ID
app.put('/students/:id', (req, res) => {
    const { name, lastName } = req.body;
    if (!name || !lastName) {
        return res.status(400).json({ error: 'Name and LastName are required' });
    }
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index !== -1) {
        students[index] = { id: parseInt(req.params.id), name, lastName };
        res.json(students[index]);
    } else {
        res.status(404).send('Student not found');
    }
});

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index !== -1) {
        students.splice(index, 1);
        res.status(204).send(); // No content
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Start the server
const PORT = 3000; // Define the port
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

