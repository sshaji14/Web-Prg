// read files easily

const fs = require('fs').promises;


// Defining a class to keep  student and course data together

class Data {
    //  to set up  data

    constructor(students, courses) {
        this.students = students; // Save the list of students
        this.courses = courses; // Save the list of courses
    }
}


// Create a variable to hold our data once we load it

let dataCollection = null;

// Function set up the data from files
function initialize() {
    
  // Return a new Promise 
    return new Promise((resolve, reject) => {
        
      // Read the file - students.json
        fs.readFile('./data/students.json', 'utf8')
            .then(studentData => {
                
              // Converting the read data from a JSON string into a JavaScript array
                let students = JSON.parse(studentData);

                
                // Reading the 'file
                return fs.readFile('./data/courses.json', 'utf8')
                    .then(courseData => {
                        // Convert the  data from a JSON string into a  array
                        let courses = JSON.parse(courseData);

                        // Create a new instance of the 'Data' class 
                        dataCollection = new Data(students, courses);

                        // the data is ready by resolving the promise
                        resolve("Data successfully loaded");
                    });
            })
            .catch(error => {
                // eject the promise with an error message
                reject(`Unable to initialize data: ${error.message}`);
            });
    });
}

// Function to get all the students
function getAllStudents() {
    
  // Return a new Promise 
    return new Promise((resolve, reject) => {
       
      
      // Check  any student data needed 
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students); // Give back the student list
        } else {
            reject("No students found"); // no students if the list is empty
        }
    });
}
// Function to get only TA
function getTAs() {
    
  
  // Return a new Promise to handle the asynchronous operation
    return new Promise((resolve, reject) => {
        
      
      // Check for to have loaded any data at all
        if (dataCollection) {
            // Getting all students who are TAs
            const TAs = dataCollection.students.filter(student => student.TA);
            if (TAs.length > 0) {
                resolve(TAs); // Gives back the list of TAs
            } else {
                reject("No TAs found"); // no TAs if the list is empty
            }
        } else {
            reject("Data not initialized"); 
        }
    });
}

// Function to get all the courses
function getCourses() {
    
  // Return a new Promise 
    return new Promise((resolve, reject) => {
        // Check if we have collection of  any course data
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses); 
        } else {
            reject("No courses found"); //  no courses if the list is empty
        }
    });
}

// Exporting
module.exports = {
    initialize, 
    getAllStudents, //to get all students
    getTAs, // to get all TAs
    getCourses // to get all courses
};
