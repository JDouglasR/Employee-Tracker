DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DEC(15,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
	role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES role(id),
	FOREIGN KEY(manager_id) REFERENCES role(id)
)

SELECT * FROM department;

INSERT INTO department (name) VALUES 
    ('EXECUTIVE'),
    ('SALES'),
    ('MARKETING'),
    ('ENGINEERING');


SELECT * FROM role;

INSERT INTO role (title, salary, department_id)

VALUES
    (CEO, 200000.00, 1),
    (Sales_Manager, 100000.00, 2),
    (Sales_Rep, 80000.00, 2),
    (Chief_Marketing_Strategist, 120000.00, 3),
    (Marketing_Analyst/Specialist, 90000.00, 3),
    (Social_Media_Manager, 65000.00, 3),
    (Chief_Engineer, 120000.00, 4),
    (Junior_Engineer, 100000.00, 4);


SELECT * FROM employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Patrick', 'Hall', 1, NULL),
    ('Daryl', 'Elliott', 2, 1),
    ('Valeria', 'Hall', 5, 4),
    ('Carina' ,'Roberts', 3, 2),
    ('Daisy', 'Lloyd', 8, 7),
    ('James', 'Dixon', 3, 2),
    ('Brad', 'Robinson', 5, 4),
    ('Kimberly', 'Cooper', 6, 4),
    ('Julian', 'Armstrong', 5, 4),
    ('Sarah', 'Robinson', 7, 1),
    ('Joanne', 'Andrews', 4, 1);

SELECT * FROM department;    
SELECT * FROM role;
SELECT * FROM employee;