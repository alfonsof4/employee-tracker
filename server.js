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

// 7 functions total: view departments, roles, employees
// able to add department, role, employee
// change employee roll
// db.query