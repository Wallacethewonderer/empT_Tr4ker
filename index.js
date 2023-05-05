const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const yellow = '\x1b[33m%s\x1b[0m';
const red = '\x1b[31m%s\x1b[0m';
const green = '\x1b[32m%s\x1b[0m';

const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(yellow, 'Connected to the database!'),
  (err) => {
    if (err) throw err;
    console.log(red, 'FAILED to connect to the database!!!');
  }
);


const start = () => {
    db.connect((err) => {
        if (err) throw err;
        console.log(green, 'Welcome to the Employee Tracker!');
        menu();
    });
};

const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                // 'Delete a department',
                'Exit'
            ]
        }
    ])
    .then((answer) => {
        switch (answer.mainMenu) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            // case 'Delete a department':
            //     deleteDepartment();
            //     break;
            case 'Exit':
                console.log(yellow, 'Logged out of the database!');
                db.end();
                process.exit();
                break;
        }
    });
};

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        console.log(red, 'Here is the table for all departments!');
        menu();
    });
};

const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        console.log(red, 'Here is the table for all roles!');
        menu();
    });
};

const viewEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        console.log(red, 'Here is the table for all employees!');
        menu();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department you would like to add?'
        }
    ])
    .then((answer) => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const input = [answer.departmentName];
        db.query(sql, input, (err, result) => {
            if (err) throw err;
            console.log(red, `added ${answer.departmentName} to the database!`);
            menu();
        });
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role you would like to add?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role you would like to add?'
        },
        {
            type: 'input',
            name: 'roleDepartment',
            message: 'Which department(id) does the role belong to?'
        }
    ])
    .then((answer) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const input = [answer.roleName, answer.roleSalary, answer.roleDepartment];
        db.query(sql, input, (err, result) => {
            if (err) throw err;
            console.log(red, `added ${answer.roleName} to the database!`);
            menu();
        });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'What is the role(id) of the employee?'
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: 'Who is the manager(id) of the employee?'
        }
    ])
    .then((answer) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const input = [answer.employeeFirstName, answer.employeeLastName, answer.employeeRole, answer.employeeManager];
        db.query(sql, input, (err, result) => {
            if (err) throw err;
            console.log(red, `added ${answer.employeeFirstName} ${answer.employeeLastName} to the database!`);
            menu();
        });
    });
};

const getEmployeeChoices = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT first_name, last_name FROM employees', (err, results) => {
        if (err) {
          reject(err);
        } else {
          const employeeChoices = results.map(employee => {
            return {
              firstName: `${employee.first_name}`,
              lastName: `${employee.last_name}`,
            };
          });
          resolve(employeeChoices);
        }
      });
    });
};
  
const updateEmployeeRole = async () => {
    const employeeChoices = await getEmployeeChoices();
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeFullName',
            message: 'Which employee you want to update?',
            choices: employeeChoices.map(employee => ({
                name: `${employee.firstName} ${employee.lastName}`,
                value: employee
            })),
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'What is the new role(id) of the employee?'
        }
    ])
    .then((answer) => {
        const sql = `UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?`;
        const input = [answer.employeeRole, answer.employeeFullName.firstName, answer.employeeFullName.lastName];
        db.query(sql, input, (err, result) => {
            if (err) throw err;
            console.log(red, `updated ${answer.employeeFullName.firstName} ${answer.employeeFullName.lastName}'s role to ${answer.employeeRole} successfully!`);
            menu();
        });
    });
};

// const getDepartmentChoices = () => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT name FROM departments', (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 const departmentChoices = results.map(department => {
//                     return {
//                         name: department.name
//                     };
//                 });
//                 resolve(departmentChoices);
//             }
//         });
//     });
// };

// const deleteDepartment = async () => {
//     const departmentChoices = await getDepartmentChoices();

//     inquirer.prompt([
//         {
//             type: 'list',
//             name: 'departmentName',
//             message: 'What is the name of the department you would like to delete?',
//             choices: departmentChoices.map(department => ({
//                 name: department.name,
//                 value: department.name
//             })),
//         }
//     ])
//     .then((answer) => {
//         const sql = `DELETE FROM departments WHERE name = ?`;
//         const input = [answer.departmentName];
//         db.query(sql, input, (err, result) => {
//             if (err) throw err;
//             console.log(red, `deleted ${answer.departmentName} from the database!`);
//             menu();
//         });
//     });
// };


start();