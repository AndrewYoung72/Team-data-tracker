const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);




const menu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "Choose an option using the arrow keys.",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Finish Build",
      ],
    })
    .then((answer) => {
      if (answer.options == "View all departments") {
        viewDepartments();
      } else if (answer.options == "View all roles") {
        viewRoles();
      } else if (answer.options == "View all employees") {
        viewEmployees();
      } else if (answer.options == "Add a department") {
        addDepartment();
      } else if (answer.options == "Add a role") {
        addRole();
      } else if (answer.options == "Add an employee") {
        addEmployee();
      } else {
        finishBuild();
      }
    });
};

const viewDepartments = () => {
  db.query("SELECT * FROM departments;", (err, res) => {
    console.table(res);
    menu();
  });
};
const viewRoles = () => {
  db.query("SELECT * FROM roles;", (err, res) => {
    console.table(res);
    menu();
  });
};
const viewEmployees = () => {
  db.query("SELECT * FROM employees;", (err, res) => {
    console.table(res);
    menu();
  });
};


const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Add department name",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO departments (dep_name) VALUES (?);`,
        [answers.departmentName],
        (err, res) => {
          console.table(res);
          menu();
        }
      );
      // db.query(
      //   `INSERT INTO departments (dep_name) VALUES ("${answers.departmentName}");`,
      //   (err, res) => {
      //     console.table(res);
      //     menu();
      //   }
      // );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Add role title",
      },
      {
        type: "input",
        name: "salary",
        message: "Add salary",
      },
      {
        type: "input",
        name: "departmentName",
        message: "Add department id",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`,
        [answers.title],
        [answers.salary],
        [answers.departmentName],
        (err, res) => {
          console.table(res);
          menu();
        }
      );
    });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Add employee's first name",
    },
    {
      type: "input",
      name: "lastName",
      message: "Add employee's last name",
    },
    {
      type: "input",
      name: "roleId",
      message: "Add employee's role id number",
    },
  ])
  .then((answers) => {
    db.query(
      `INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?);`,
      [answers.firstName],
      [answers.lastName],
      [answers.roleId],
      (err, res) => {
        console.table(res);
        menu();
      }
    )
  });
};


menu();

//UPDATE employees SET role_id = 2 WHERE id = 1
