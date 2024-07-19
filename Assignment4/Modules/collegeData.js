// Import the 'fs' module to work with files
const fs = require('fs').promises;

// Define a class to store student and course data together
class Data {
    constructor(students, courses) {
        this.students = students; // Store student data in an array
        this.courses = courses; // Store course data in an array
    }
}

// Variable to store data after it is loaded
let dataCollection = null;

// Function to load data from JSON files
function initialize() {
    return new Promise((resolve, reject) => {
        // Read the students.json file
        fs.readFile('./data/students.json', 'utf8')
            .then(studentData => {
                let students = JSON.parse(studentData); // Parse student data

                // Read the courses.json file
                return fs.readFile('./data/courses.json', 'utf8')
                    .then(courseData => {
                        let courses = JSON.parse(courseData); // Parse course data

                        // Create a Data object with student and course data
                        dataCollection = new Data(students, courses);

                        resolve("Data successfully loaded"); // Resolve the promise
                    });
            })
            .catch(error => {
                reject(`Unable to initialize data: ${error.message}`); // Reject the promise if there is an error
            });
    });
}

// Function to get all students
function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students); // Resolve with student data if there are students
        } else {
            reject("No students found"); // Reject if no students are found
        }
    });
}

// Function to get all TAs (Teaching Assistants)
function getTAs() {
    return new Promise((resolve, reject) => {
        if (dataCollection) {
            const TAs = dataCollection.students.filter(student => student.TA); // Filter students who are TAs
            if (TAs.length > 0) {
                resolve(TAs); // Resolve with TA data if there are TAs
            } else {
                reject("No TAs found"); // Reject if no TAs are found
            }
        } else {
            reject("Data not initialized"); // Reject if data is not loaded
        }
    });
}

// Function to get all courses
function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses); // Resolve with course data if there are courses
        } else {
            reject("No courses found"); // Reject if no courses are found
        }
    });
}

// Function to get students by course
function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        if (dataCollection) {
            const filteredStudents = dataCollection.students.filter(student => student.course === course); // Filter students by course
            if (filteredStudents.length > 0) {
                resolve(filteredStudents); // Resolve with filtered students if there are matches
            } else {
                reject("No results returned"); // Reject if no students match the course
            }
        } else {
            reject("Data not initialized"); // Reject if data is not loaded
        }
    });
}

// Function to get a student by student number
function getStudentByNum(num) {
    return new Promise((resolve, reject) => {
        if (dataCollection) {
            const foundStudent = dataCollection.students.find(student => student.studentNum === num); // Find student by student number
            if (foundStudent) {
                resolve(foundStudent); // Resolve with student data if found
            } else {
                reject("No results returned"); // Reject if no student is found
            }
        } else {
            reject("Data not initialized"); // Reject if data is not loaded
        }
    });
}

// Function to add a new student
function addStudent(studentData) {
    return new Promise((resolve, reject) => {
        // Check if TA is not set, make it false; otherwise, make it true
        if (!studentData.TA) {
            studentData.TA = false;
        } else {
            studentData.TA = true;
        }

        // Assign a new student number
        studentData.studentNum = dataCollection.students.length + 1;

        // Add new student to the students array
        dataCollection.students.push(studentData);

        // Write the updated students array to the file
        fs.writeFile('./data/students.json', JSON.stringify(dataCollection.students, null, 2))
            .then(() => {
                resolve(); // Resolve the promise after writing to the file
            })
            .catch(err => {
                reject(err); // Reject the promise if there is an error
            });
    });
}

// Exporting functions to be used in other files
module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses,
    getStudentsByCourse,
    getStudentByNum,
    addStudent // Exporting addStudent function
};
