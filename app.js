const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "wQgpcw%@RIGTQFAA",
    database: "tracker_db"
  });

// Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) throw err;
    start();
  });


function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "todo",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by role",
          "Add employee",
          "Add role",
          "Add department",
          "Exit",
        ],
      },
    ])
    .then((res) => {
      switch (res.todo) {
        case "View all employees":
          viewEmp();
          break;
        case "View all employees by role":
          viewRole();
          break;
        case "View all employees by department":
          viewDept();
          break;
        case "Add employees":
          addEmp();
          break;
        case "Add role":
          addRole();
          break;
        case "Add department":
          addDept();
          break;
        case "Exit":
          exit();
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

viewEmp = () => {
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary'
    connection.query
    console.table()

    start();
};

viewRole = () => {

    start();
};

viewDept = () => {
    query = `SELECT name AS "Departments" FROM department`;
    connection.query(query, (err, res) => {
     if (err) throw err;
     console.table(res);
     start();
    });
};

addEmp = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employees first name?',
                name: 'first_name'
            },{
                type: 'input',
                message: 'What is the employees last name?',
                name: 'last_name'
            },{
                type: 'input',
                message: 'What is the employees role?',
                name: 'role'
            },{
                type: 'input',
                message: 'Is this employee a manager?',
                name: 'isManager'
            },
        ]).then(function(res) {
            const first_name = res.first_name;
            const last_name = res.last_name;
            const role = res.role;
            const isManager = res.isManager;

            //TODO - add new employee to table

            console.log('New Employee added!');
            start();
        }).catch(function(err) {
            console.log(err);
        })
};

addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Input title for new role',
                name: 'role'
            },{
                type: 'number',
                message: 'What is the salary for this role?',
                name: 'roleSalary'
            },{
                type: 'list',
                message: 'In what department is this new role?',
                name: 'roleDept',
                choices: [
                    'Executive',
                    'Sales',
                    'Marketing',
                    'Engineering'
                ]
            }
        ]).then(function(res) {
            const role = res.role;
            const roleSalary = res.roleSalary;
            const roleDept = res.roleDept;

            //TODO -- add new role to table

            console.log('New Role added!');
            start();
        }).catch(function(err) {
            console.log(err);
        })
};

addDept = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Input name for new department',
                name: 'dept'
            }
        ]).then(function(res) {
            const dept = res.dept;

            //TODO -- add new dept to table

            console.log('New Department added!')
            start();
        }).catch(function(err) {
            console.log(err);
        })
};

exit = () => {

};
