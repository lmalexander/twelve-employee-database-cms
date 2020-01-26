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
    .then(function(answer) {
        if (answer.userAction === "{ADD NEW} department") {
            newDept();
        }
        else if (answer.userAction === "{ADD NEW} role") {
            newRole();
        }
        else if (answer.userAction === "{ADD NEW} employee") {
            newEmployee();
        }
        else if (answer.userAction === "{VIEW ALL} departments") {
            viewDept();
        }
        else if (answer.userAction === "{VIEW ALL} roles") {
            viewRoles();
        }
        else if (answer.userAction === "{VIEW ALL} employees") {
            viewEmployees();
        }
        else if (answer.userAction === "{UPDATE} employee roles") {
            updateEmployeeRoles();
        }
        else {
            connection.end();
        }
    })
}

// ---------- userAction options

// -------- add new 
// ----- departments
function newDept() {
    // prompt user for new department name
    inquirer.prompt([
            {
                name: "newDept",
                type: "input",
                message: "Enter new department name."
            }
    ])
    // insert new department into employeeTracker_db
    .then(function(answer) {
        // connect to database and insert role key value pairs
        connection.query(
            "insert into department set ?",
            {
                name: answer.newDept,
            },
            // throw error or console.log success
            function(err) {
                if (err) throw err;
                console.log("New department successfully added!");
                // return user to start(), prompt user actions again
                start();
            }
        );
    });
}

// ----- roles
function newRole() {
    // query database for all departments to be displayed later
    connection.query("select * from department", function(err, results) {
        if (err) throw err;
        // prompt user for new employee role information
        inquirer.prompt([
        {
            name: "newRoleTitle",
            type: "input",
            message: "Enter new employee position title."
        },
        {
            name: "newRoleSalary",
            type: "input",
            message: "Enter new employee position salary.",
        },
        {
            name: "newRoleDept",
            type: "rawlist",
            // function to return department names as choices array
            choices: function() {
                const deptArray = [];
                for (let i = 0; i < results.length; i++) {
                    deptArray.push(results[i].name);
                }
                return deptArray;              
            },
            message: "Select new employee position department."    
            }
    ])
    // insert new role into employeeTracker_db
    .then(function(answer) {
        // store department id value to insert into key value pair 
        const newRoleDeptID = "";
        if (answer.newRoleDept === results[i].name) {
            newRoleDeptID === id[i];
        };
        // connect to database and insert role key value pairs
        connection.query(
            "insert into role set ?",
            {
                title: answer.newRoleTitle,
                salary: answer.newRoleSalary,
                department_id: newRoleDeptID
            },
            // throw error or console.log success
            function(err) {
                if (err) throw err;
                console.log("New employee position successfully added!");
                // return user to start(), prompt user actions again
                start();
            }
        );
    });
    }) 
}

// ----- employees
function newEmployee() {
    // query database for role information to be used later
    connection.query("select * from role", function (err, results) {
        if (err) throw err;
        // prompt user for new employee information
        inquirer.prompt([
            {
                name: "firstNameNewEmployee",
                type: "input",
                message: "Enter new employee's first name."
            },
            {
                name: "lastNameNewEmployee",
                type: "input",
                message: "Enter new employee last name."
            },
            // returns position titles to choose role, later stored as roleID
            { 
                name: "roleNewEmployee",
                type: "rawlist",
                choices: function() {
                    const roleArray = [];
                    for (let i = 0; i < results.length; i++) {
                        roleArray.push(results[i].title);
                    }
                    return roleArray;
                },
                message: "Select new employee role."
            },
            // returns position titles to choose manager position, later stored as managerID
            {
                name: "managerNewEmployee",
                type: "rawlist",
                choices: function() {
                    const roleArray = [];
                    for (let i = 0; i < results.length; i++) {
                        roleArray.push(results[i].title);
                    }
                    return roleArray;
                },
                message: "Select new employee manager. If none, hit enter to continue."
            }
        ])
        .then(function(answer) {
            // store roleID
            const roleIDNewEmployee = "";
            if (answer.roleNewEmployee === results[i].name) {
                roleIDNewEmployee === id[i];
            };
            // store managerID
            const managerIDNewEmployee = "";
            if (answer.managerNewEmployee === results[i].name) {
                managerIDNewEmployee === id[i];
            };
            // connect to database and insert employee key value pairs
            connection.query(
                "insert into employee set ?",
                {
                    first_name: answer.firstNameNewEmployee,
                    last_name: answer.lastNameNewEmployee,
                    role_id: roleIDNewEmployee,
                    manager_id: managerIDNewEmployee
                },
                // throw err or console.log success
                function(error) {
                    if (err) throw err;
                    console.log("New employee successfully added!");
                    // return user to start(), prompt user actions again
                    start();
                }
            );
        });
    })
}

// -------- view
// ----- departments
function viewDept() {}

// ----- roles
function viewRoles() {}

// ----- employees
function viewEmployees() {}

// -------- update
// ----- employee roles
function updateEmployeeRoles() {}


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