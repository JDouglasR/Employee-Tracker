const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");


var connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "wQgpcw%@RIGTQFAA",
		database: "tracker_db"
	});


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
					"View all roles",
					"View all departments",
					"Update employee role",
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
				case "View all roles":
					viewRole();
					break;
				case "View all departments":
					viewDept();
						break;
				case "Udate employee role":
					updateEmp();
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
					connection.end()
					break;
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

viewEmp = () => {
		query = "SELECT * FROM employee";
		connection.query(query, (err, res) => {
			if (err) throw err;
			console.table(res);
				start();
		});
};

viewRole = () => {
		query = "SELECT * FROM role";
		connection.query(query, (err, res) => {
			if (err) throw err;
			console.table(res);
				start();
		});
};

viewDept = () => {
		query = "SELECT * FROM department";
		connection.query(query, (err, res) => {
				if (err) throw err;
				console.table(res);
				start();
		});
};

updateEmp = () =>  {
		var allEmployees = [];
		connection.query("SELECT * FROM employee", function(err, answer) {
			if (err) throw err;

			for (var i = 0; i < answer.length; i++) {
				let employeeString = answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
				allEmployees.push(employeeString);
			};

			inquirer
				.prompt([
					{
						type: "list",
						message: "Select an employee to change their role",
						name: "updateRole",
						choices: allEmployees
					},
					{
						type: "list",
						message: "Select a new role",
						name: "newRole",
						choices: [
								"Sales Manager",
								"Sales Rep",
								"Chief Marketing Strategist",
								"Marketing Analyst/Specialist",
								"Social Media Manager",
								"Chief Engineer",
								"Junior Engineer"
						]
				}]).then(function(answer) {
						console.log("Updating ", answer);
						const idUpdate = {};
						idUpdate.id = parseInt(answer.updateRole.split(" ")[0]);
						if (answer.newRole === "Sales Manager") {
							idUpdate.role_id = 2;
						} else if (answer.newRole === "Sales Rep") {
							idUpdate.role_id = 3;
						} else if (answer.newRole === "Chief Marketing Strategist") {
								idUpdate.role_id = 4;
						} else if (answer.newRole === "Marketing Analyst/Specialist") {
								idUpdate.role_id = 5;
						} else if (answer.newRole === "Social Media Manager") {
								idUpdate.role_id = 6;
						} else if (answer.newRole === "Chief Engineer") {
								idUpdate.role_id = 7;
						} else if (answer.newRole === "Junior Engineer") {
								idUpdate.role_id = 8;
						}
						connection.query(
							"UPDATE employee SET role_id = ? WHERE id = ?",
							[idUpdate.role_id, idUpdate.id],
								start()
						);
				})
		})
}

addEmp = () => {

		//TODO  FOR LOOP TO VAR = [] for id choices.

		inquirer
				.prompt([
						{
								type: "input",
								message: "What is the employees first name?",
								name: "first_name"
						},{
								type: "input",
								message: "What is the employees last name?",
								name: "last_name"
						},{
								type: "list",
								message: "What is the employee's role?",
								name: "role",
								choices: [
										"Sales Manager",
										"Sales Rep",
										"Chief Marketing Strategist",
										"Marketing Analyst/Specialist",
										"Social Media Manager",
										"Chief Engineer",
										"Junior Engineer"
								]
						},{
								type: "list",
								message: "What is their manager's id",
								name: "managerID",
								choices: [
										1,
										2,
										4,
										7,
								]
						}
				]).then(function (res) {
						query = "INSERT INTO employee SET ?";
						connection.query(
							query,
							{
								first_name: res.firstname,
								last_name: res.lastname,
								role_id: res.role,
								manager_id: res.managerID,
							},
							(err) => {
								if (err) throw err;
								console.log("Added new employee!");
								start();
						 }
				);
		})
};


addRole = () => {
		inquirer
				.prompt([
						{
								type: "input",
								message: "Input title for new role",
								name: "role"
						},{
								type: "number",
								message: "What is the salary for this role?",
								name: "roleSalary"
						},{
								type: "list",
								message: "What is the new department ID?",
								name: "roleDept",
								choices: [
										1,
										2,
										3,
										4
								]
						}
				]).then(function (res) {
						query = "INSERT INTO role SET ?";
						connection.query(
							query,
							{
								title: res.role,
								salary: res.roleSalary,
								department_id: res.roleDept,
							},
							(err) => {
								if (err) throw err;
								console.log("Added new role!");
								start();
						}
				);
		})
};

addDept = () => {
		inquirer
				.prompt([
						{
								type: "input",
								message: "Input name for new department",
								name: "dept"
						}
				]).then(function(res) {
						query = "INSERT INTO department SET ?";
						connection.query(
							query,
							{
								name: res.dept,
							},
							(err) => {
								if (err) throw err;
								console.log("Added new department!");
								start();
							}
				);
		})
};