const API_URL = 'http://localhost:3000/students'; // API URL
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const studentName = document.getElementById('studentName');
const studentLastName = document.getElementById('studentLastName');
const studentId = document.getElementById('studentId');

// Fetch and display all students
async function fetchStudents() {
    const response = await fetch(API_URL);
    const fetchedStudents = await response.json();

    studentTableBody.innerHTML = ''; // Clear table
    fetchedStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Add or edit a student
studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = studentId.value;
    const name = studentName.value;
    const lastName = studentLastName.value;

    if (id) {
        // Edit student
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, lastName })
        });
    } else {
        // Add new student
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, lastName })
        });
    }

    studentForm.reset();
    fetchStudents();
});

// Load student data into form for editing
async function editStudent(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const student = await response.json();

    studentId.value = student.id;
    studentName.value = student.name;
    studentLastName.value = student.lastName;
}

// Delete a student
async function deleteStudent(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStudents();
}

// Initial fetch
fetchStudents();
