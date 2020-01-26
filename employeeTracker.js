// ---------- dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const path = require("path");
const password = require("./password");

// ---------- sql database connection information
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: `${password()}`,
    database: "employeeTracker_db"
});

// ---------- inquirer.prompt start()
// prompt user for an action
// run function based on user choice
function start() {
    inquirer.prompt(
        {
            name: "userAction",
            type: "list",
            message: "Employee Tracker Options:",
            choices: [
                "{ADD NEW} department",
                "{ADD NEW} role",
                "{ADD NEW} employee",
                "{VIEW ALL} departments",
                "{VIEW ALL} roles",
                "{VIEW ALL} employees",
                "{UPDATE} employee roles"
            ]
        }
    )
/*     .then(function(answer) {

    }) */
}

// ---------- userAction options
// -------- add new 
// ----- departments
// ----- roles
// ----- employees

// -------- view
// ----- departments
// ----- roles
// ----- employees

// -------- update
// ----- employee roles


// ---------- connect to mysql server & run start()
connection.connect(function(err) {
    // check server connection
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    start();
});