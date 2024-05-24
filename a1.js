// console.log("Hello World");
/*********************************************************************************
*  WEB700 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Susan Shaji Student ID: 1147985238 Date: 24/05/24
*
********************************************************************************/
 
const serverVerbs =["GET", "GET", "GET", "POST", "GET", "POST"];
const serverPaths = ["/","/about","/contact","/login","/panel","/logout"];
const stdName = "Susan Shaji"; // storing name and email in constant variable
const stdEmail = "sshaji14@myseneca.ca"

const serverRsponse = [
    "Welcome to WEB700 Assignment 1", 
    `This course name is WEB700. This assignment was prepared by ${stdName}`, 
    `${stdEmail}\n${stdName}`, 
    "Hello, User Logged In", 
    "Main Panel",
    "Logout Complete. Goodbye"
];
//function for HTTP request 
function httpRequest(httpVerb, path){
    for (let i=0; i < serverPaths.length; i++){
        if (serverVerbs[i] === httpVerb && serverPaths[i] === path) {
            return `200: ${serverRsponse[i]}`;
        }
    }
    return `404: Unable to process ${httpVerb} request for ${path}`;
}
//testing the hhtpRequest function with different combinations of HTTP verbs and paths 
console.log(httpRequest("GET","/"));
console.log(httpRequest("GET","/about"));
console.log(httpRequest("GET","/contact"));
console.log(httpRequest("POST","/login"));
console.log(httpRequest("GET","/panel"));
console.log(httpRequest("POST","/logout"));
console.log(httpRequest("PUT","/"));


//function to generate random positive number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function automateTests() {
    const testVerbs = ["GET", "POST"];
    const testPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout", "/randomPath1", "/randomPath2"];

    function randomRequest() {
        const randVerb = testVerbs[getRandomInt(testVerbs.length)];
        const randPath = testPaths[getRandomInt(testPaths.length)];
        console.log(httpRequest(randVerb, randPath));
    }

    setInterval(randomRequest, 1000);
}
// Using automateTests function to start testing
automateTests();

