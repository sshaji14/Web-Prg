const express = require('express');
const path = require('path');
const collegeData = require('./Modules/collegeData'); 
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'views')));

// Middleware for logging request headers and URLs
app.use((req, res, next) => {
    console.log(req.headers);
    console.log(`${Date()} : ${req.url}`);
    next();
});

app.get('/students', (req, res) => {         // Route to get all students 
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

app.get('/tas', (req, res) => {          // Route to get all TAs
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

app.get('/courses', (req, res) => {     // Route to get all courses
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

app.get('/student/:num', (req, res) => {   // Route to get a student by studentNum
    const num = req.params.num;
    collegeData.getStudentByNum(num)
        .then(student => {
            res.json(student);
        })
        .catch(err => {
            res.status(404).json({ message: 'no results' });
        });
});

app.get('/', (req, res) => {            // Route for home page
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {       // Route for about page
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/htmlDemo', (req, res) => {    // Route for htmlDemo page
    res.sendFile(path.join(__dirname, 'views', 'htmlDemo.html'));
});

app.use((req, res) => {                // Route for handling unmatched routes
    res.status(404).send("Page Not THERE, Are you sure of the path?");
});

collegeData.initialize()               // Initialize collegeData and start the server
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port: ${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error(`Unable to initialize data: ${err}`);
    });
 