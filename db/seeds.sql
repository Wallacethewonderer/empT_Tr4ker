INSERT INTO departments (name)
VALUES 
  ('Sales'), 
  ('Engineering'), 
  ('Finance'), 
  ('Legal'),
  ('HR');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Manager', 100000, 1),
  ('Lead Engineer', 150000, 2),
  ('Account Manager', 160000, 3),
  ('Legal Team Lead', 250000, 4),
  ('HR Manager', 110000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Mike', 'Chan', 1, NULL),
  ('Jane', 'Smith', 2, NULL),
  ('Sally', 'Brown', 3, NULL),
  ('Jim', 'Johnson', 4, NULL),
  ('Mike', 'Jones', 5, NULL);
