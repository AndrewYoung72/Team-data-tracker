const { Module } = require("module");

class Employee {
  constructor(id, first_name, last_name, role_id, manager_id) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;

  }

  viewDepartments() {
    app.get('/departments', (req, res) => {
      db.query('SELECT * FROM departmaents', function (err, results) {
        console.table(results);
        res.status(200).json(results);
      })
    });
  }

  viewRoles() {

  }

  viewEmployees() {

  }
 
 
}

module.exports = Employee;