/*********************************************************************************
* WEB700 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Susan Shaji Student ID:147985238 Date: 06-06-2024
*
********************************************************************************/

const collegeData = require('./Modules/collegeData');

// Start by calling the initialize function to read data from the JSON files
collegeData.initialize()
    .then(() => {
        // Now, get all the students from the read data
        return collegeData.getAllStudents(); // This returns a promise with the student data
    })
    .then((students) => {
        // If we successfully got the students, we get here
        console.log(`Successfully retrieved ${students.length} students`); // Log how many students we got

        // Next, get all the courses from the read data
        return collegeData.getCourses(); // This returns a promise with the course data
    })
    .then((courses) => {
        // If we successfully got the courses, we get here
        console.log(`Successfully retrieved ${courses.length} courses`); // Log how many courses we got

        // Finally, get all the TAs from the read data
        return collegeData.getTAs(); // This returns a promise with the TA data
    })
    .then((TAs) => {
        // If we successfully got the TAs, we get here
        console.log(`Successfully retrieved ${TAs.length} TAs`); // Log how many TAs we got
    })
    .catch((error) => {
        // If there was any error, we get here
        console.error("An error occurred:", error); // Log the error message
    });