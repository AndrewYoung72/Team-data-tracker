const inquirer = require("inquirer");
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
        "Update employee data",
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
      } else if (answer.options == "Update employee data") {
        updateEmployee();
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
          console.log("Added to the database!");
          menu();
        }
      );
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
        name: "departmentId",
        message: "Add department id",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`,
        [answers.title, answers.salary, answers.departmentId],
        (err, res) => {
          console.table(res);
          menu();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Add employee's first name.",
      },
      {
        type: "input",
        name: "lastName",
        message: "Add employee's last name.",
      },
      {
        type: "input",
        name: "roleId",
        message: "Add employee's role id number.",
      },
      {
        type: "input",
        name: "managerId",
        message: "Add manager's id number or null.",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
        [
          answers.firstName,
          answers.lastName,
          answers.roleId,
          answers.managerId,
        ],
        (err, res) => {
          console.table(res);
          menu();
        }
      );
    });
};

const updateEmployee = () => {
  db.query("SELECT * FROM employees;", (err, resSe) => {
    console.log(resSe);
    inquirer
      .prompt([
        {
          type: "list",
          name: "targetEmployee",
          message: "Which employee would you like to update?",
          choices: resSe.map((employee) => {
            return {
              name: employee.first_name,
              value: employee.id,
            };
          }),
        },
      ])
      .then(() => {
        db.query("SELECT * FROM roles;", (err, resSr) => {
          console.log(resSr);
          inquirer
            .prompt([
              {
                type: "input",
                name: "targetRole",
                message: "What is the new role id of the employee?",
              },
            ])
            .then(() => {
              db.query(
                `UPDATE employees SET (role_id) WHERE (id); VALUES(?, ?);`,
                [resSr.id, employee.id],
                (err, update) => {
                  console.table(update);
                  menu();
                }
              );
            });
        });
      });
  });
};

const finishBuild = () => {
  console.log(
    "If you are finished press control c to return to your command line."
  );
};

menu();

//UPDATE employees SET role_id = 2 WHERE id = 1
