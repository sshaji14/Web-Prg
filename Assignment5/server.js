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
const exphbs = require('express-handlebars');
const app = express();
const helpers = require('./helpers'); // Require the helpers
const HTTP_PORT = process.env.PORT || 8081; // Changed port


//

// Middleware for serving static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Middleware for logging request headers and URLs
app.use((req, res, next) => {
    console.log(req.headers);
    console.log(`${Date()} : ${req.url}`);
    next();
});

// Middleware for active route
app.use((req, res, next) => {
    let route = req.path.substring(1);
    app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
    next();
});

// Set up Handlebars
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: helpers // Register the helpers
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/htmlDemo', (req, res) => {
    res.render('htmlDemo');
});

app.get('/students/add', (req, res) => {
    res.render('addStudent');
});

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

// app.get('/students', (req, res) => {
//     if (req.query.course) {
//         collegeData.getStudentsByCourse(req.query.course)
//             .then(students => {
//                 if (students.length > 0) {
//                     res.json(students);
//                 } else {
//                     res.status(404).json({ message: 'no results' });
//                 }
//             })
//             .catch(err => {
//                 res.status(500).json({ error: err.message });
//             });
//     } else {
//         collegeData.getAllStudents()
//             .then(students => {
//                 if (students.length > 0) {
//                     res.json(students);
//                 } else {
//                     res.status(404).json({ message: 'no results' });
//                 }
//             })
//             .catch(err => {
//                 res.status(500).json({ error: err.message });
//             });
//     }
// });

 app.get('/students', (req, res) => {
    res.render('students');
});
  app.get('/students', (req, res) => {
    collegeData.getAllStudents()
        .then(students => {
            res.render('students', { students });
        })
        .catch(err => {
            res.status(500).send(`Unable to get students: ${err}`);
        });
});

  
// app.get('/courses', (req, res) => {
//     collegeData.getCourses()
//         .then(courses => {
//             if (courses.length > 0) {
//                 res.json(courses);
//             } else {
//                 res.status(404).json({ message: 'no results' });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ error: err.message });
//         });
// });
app.get('/courses', (req, res) => {
    res.render('courses');
});
app.get('/courses', (req, res) => {
    collegeData.getAllCourses()
      .then((data) => res.render('courses', { courses: data }))
      .catch((err) => res.render('courses', { message: "no results" }));
  });
  
////
// Route to display all courses

// Route to display a specific course
app.get('/course/:id', (req, res) => {
    const courseId = req.params.id;
    collegeData.getCourseById(courseId)
        .then(course => {
            res.render('course', { course });
        })
        .catch(err => {
            res.status(404).send("Course not found");
        });
});
//

app.get('/students/:studentNum', (req, res) => {
    const num = req.params.studentNum;
    collegeData.getStudentByNum(num)
        .then(student => {
            res.render('student', { student: student });
        })
        .catch(err => {
            res.status(404).json({ message: 'no results' });
        });
});

app.post('/students/update', (req, res) => {
    console.log(req.body);
    res.redirect('/students');
});



// app.get('/student/:num', (req, res) => {
//     const num = req.params.num;
//     collegeData.getStudentByNum(num)
//         .then(student => {
//             res.json(student);
//         })
//         .catch(err => {
//             res.status(404).json({ message: 'no results' });
//         });
// });

app.use((req, res) => {
    res.status(404).send("Page Not THERE, Are you sure of the path?");
});

collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port: ${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error(`Unable to initialize data: ${err}`);
    });
