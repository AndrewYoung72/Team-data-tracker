INSERT INTO departments (id, dep_name)
VALUES (001, "Human Resources");

INSERT INTO roles (id, title, salary, department_id,)
VALUES (002, "HR Manager", 120000, 001);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (030, "Henrietta", "Ironpants", 002, 007);

