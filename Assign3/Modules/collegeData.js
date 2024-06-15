// read files easily

// Importing the 'fs' module for file operations
const fs = require('fs').promises;

// Defining a class to hold student and course data together
class Data {
    constructor(students, courses) {
        this.students = students; // Array to hold student data
        this.courses = courses; // Array to hold course data
    }
}

// Variable to store loaded data once initialized
let dataCollection = null;

// Function to initialize data from JSON files
function initialize() {
    return new Promise((resolve, reject) => {
        // Read students.json file
        fs.readFile('./data/students.json', 'utf8')
            .then(studentData => {
                let students = JSON.parse(studentData);

                // Read courses.json file
                return fs.readFile('./data/courses.json', 'utf8')
                    .then(courseData => {
                        let courses = JSON.parse(courseData);

                        // Create Data instance with loaded data
                        dataCollection = new Data(students, courses);

                        resolve("Data successfully loaded");
                    });
            })
            .catch(error => {
                reject(`Unable to initialize data: ${error.message}`);
            });
    });
}

// Function to get all students
function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("No students found");
        }
    });
}

// Function to get all TAs (Teaching Assistants)
function getTAs() {
    return new Promise((resolve, reject) => {
        if (dataCollection) {
            const TAs = dataCollection.students.filter(student => student.TA);
            if (TAs.length > 0) {
                resolve(TAs);
            } else {
                reject("No TAs found");
            }
        } else {
            reject("Data not initialized");
        }
    });
}

// Function to get all courses
function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("No courses found");
        }
    });
}

// Function to get students by course
function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        if (dataCollection) {
            const filteredStudents = dataCollection.students.filter(student => student.course === course);
            if (filteredStudents.length > 0) {
                resolve(filteredStudents);
            } else {
                reject("No results returned");
            }
        } else {
            reject("Data not initialized");
        }
    });
}

// Function to get student by studentNum
function getStudentByNum(num) {
    return new Promise((resolve, reject) => {
        if (dataCollection) {
            const foundStudent = dataCollection.students.find(student => student.studentNum === num);
            if (foundStudent) {
                resolve(foundStudent);
            } else {
                reject("No results returned");
            }
        } else {
            reject("Data not initialized");
        }
    });
}

// Exporting functions
module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses,
    getStudentsByCourse,
    getStudentByNum
};
