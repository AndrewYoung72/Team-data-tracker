const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');

const departmentArray = [];
const rolesArray = [];
const employeesArray = [];




const menu = () => {

  inquirer.prompt({
      type: "list",
      name: "options",
      message: "Choose an option using the arrow keys.",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
      ]
    })
    .then((answer) => {
      if(answer.options == "View all departments") {
        viewDepartments()
      } else if(answer.options == "View all roles") {
        viewRoles()
      } else if(answer.options == "View all employees") {
        viewEmployees()
      }
    })
}
menu()