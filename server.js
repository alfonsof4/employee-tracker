const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.db_password,
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// prompt functions
function startPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Change Employee Role'],
    
    }).then(answer => {
        switch (answer.menu) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Change Employee Role':
                changeEmployeeRole();
                break;
        }
    })
};

// view all deparments function
function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err. message })
            return;
        }
        console.table(result);
        startPrompt();
    });
};

// view roles function
function viewAllRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err. message })
            return;
        }
        console.table(result);
        startPrompt();
    });
};

// view all employees function
function viewAllEmployees() {
    const sql = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                role.title AS job_title,
                department.department_name,
                role.salary,
                CONCAT(manager.first_name, '' ,manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                ORDER By employee.id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startPrompt();
    });
};

// Add departments function
function addDepartment() {
    inquirer.prompt([
        {
            name: 'department_name',
            type: 'input',
            message: 'Please enter the department you want to add to database'
        }
    ]).then((answer) => {

    const sql = `INSERT INTO department (department_name)
                VALUES (?)`;
    const params = [answer.department_name];
    db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.log('The new department has been added successfully to the database!');
        
        db.query(`SELECT * FROM department`, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message })
                return;
        }
        console.table(result);
        startPrompt();
        });
    });
});
};
// Add role function
function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Please enter the title of role you want to add to the database'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Please enter the salary associated with the role you want to add tp the database'
        },
        {
            name: 'department_id',
            type: 'number',
            message: 'Please enter the department id associated with the role you want to add to the database'    
        }
    ]).then(function (response) {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.title, response.salary, response.department_id], function (err, data) {
            if (err) throw err;
            console.log('The new role has been added to the database');

            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
});
};

// Add employee function
function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Please enter the first name of the employee you want to add to database'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Please enter the last name of the employee you want to add to the database'
        },
        {
            name: 'role_id',
            type: 'number',
            message: 'Please enter the role id of the employee you want to add to the database. (Numbers only.)'
        },
        {
            name: 'manager_id',
            type: 'number',
            message: 'Please enter the manager id associated with the employee you want to add to the database. (Numbers only.)'
        }
    ]).then(function (response) {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, data) {
            if (err) throw err;
            console.log('The new employee has been successfully added to the database.');

            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
});
};

function changeEmployeeRole() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Please enter the first name of the employee you want to update in the database'
        },
        {
            name: 'role_id',
            type: 'number',
            message: 'Please enter the new role id associated witht he employee you want to update in the database. (Numbers only.)'
        }
    ]).then(function (response) {
        db.query('UPDATE employee SET role_id = ? WHERE first_name = ?', [response.role_id, response.first_name], function (err, data) {
            if (err) throw err;
            console.log('The new role entered has been added successfull to the database');

            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startPrompt();
            });
        })
});
};
startPrompt();
// 7 functions total: view departments, roles, employees
// able to add department, role, employee
// change employee roll
// db.query