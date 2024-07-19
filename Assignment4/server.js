/*********************************************************************************
* WEB700 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name:Susan Shaji Student ID: 147985238 Date: 18-07-2024
*
* Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/
const express = require('express');
const path = require('path');
const collegeData = require('./Modules/collegeData');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Middleware for serving static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Middleware for logging request headers and URLs
app.use((req, res, next) => {
    console.log(req.headers);
    console.log(`${Date()} : ${req.url}`);
    next();
});

// Route to serve addStudent.html
app.get('/students/add', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/addStudent.html'));
});

// Route to handle form submission for adding a new student
app.post('/students/add', (req, res) => {
    const newStudent = req.body;
    collegeData.addStudent(newStudent)
        .then(() => {
            res.redirect('/students');
        })
        .catch(err => {
            res.status(500).send(`Unable to add student: ${err}`);
        });
});

// Route to get all students
app.get('/students', (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(students => {
                if (students.length > 0) {
                    res.json(students);
                } else {
                    res.status(404).json({ message: 'no results' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    } else {
        collegeData.getAllStudents()
            .then(students => {
                if (students.length > 0) {
                    res.json(students);
                } else {
                    res.status(404).json({ message: 'no results' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    }
});

// Route to get all TAs
app.get('/tas', (req, res) => {
    collegeData.getTAs()
        .then(tas => {
            if (tas.length > 0) {
                res.json(tas);
            } else {
                res.status(404).json({ message: 'no results' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Route to get all courses
app.get('/courses', (req, res) => {
    collegeData.getCourses()
        .then(courses => {
            if (courses.length > 0) {
                res.json(courses);
            } else {
                res.status(404).json({ message: 'no results' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Route to get a student by studentNum
app.get('/student/:num', (req, res) => {
    const num = req.params.num;
    collegeData.getStudentByNum(num)
        .then(student => {
            res.json(student);
        })
        .catch(err => {
            res.status(404).json({ message: 'no results' });
        });
});

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Route for about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route for htmlDemo page
app.get('/htmlDemo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'htmlDemo.html'));
});

// Route for handling unmatched routes
app.use((req, res) => {
    res.status(404).send("Page Not THERE, Are you sure of the path?");
});

// Initialize collegeData and start the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port: ${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error(`Unable to initialize data: ${err}`);
    });
