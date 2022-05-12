const inquirer = require("inquirer");
const fs = require("fs");

const menu = () => {

  inquirer.prompt({
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
      ]
    })
    .then((answer) => {
      if(answer.options == "View all departments") {
        viewDepartments()
      } else if(answer.options == "View all roles") {
        viewRoles()
      } else if(answer.options == "View all employees") {
        viewEmployees()
      } else if(answer.options == "Add a department") {
        addDepartment()
      } else if(answer.options == "Add a role") {
        addRole()
      } else if(answer.options == "Add an employee") {
        addEmployee()
      } else {
        finishBuild()
      }

    })
}

const addDepartment = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "Department id",
    message: "Add department id number",
    },
    {
    type: "input",
    name: "Department name",
    message: "Add department name",
    },
  ])
menu();
}


const addRole = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "role id",
    message: "Add role id number",
    },
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
    name: "Department id",
    message: "Add department id",
    },
  ])
menu();
}


const addEmployee = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "employee id",
    message: "Add department id number",
    },
    {
    type: "input",
    name: "first name",
    message: "Add employee's first name",
    },
    {
    type: "input",
    name: "last name",
    message: "Add employee's last name",
    },
    {
    type: "input",
    name: " role id",
    message: "Add role id number name",
    },
    {
    type: "input",
    name: "manager id",
    message: "Add manager's id number",
    },
  ])
menu();
}

menu()