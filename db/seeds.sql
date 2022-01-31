INSERT INTO department (department_name)
VALUES
    ('HR'),
    ('Tech'),
    ('Marketing'),
    ('Finance'),
    ('Sales'),
    ('Engineering'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Salesperson', 80000, 5),
    ('Lead Engineer', 151000, 6),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 4),
    ('Accountant', 120000, 4),
    ('Legal Team Lead', 250000, 7),
    ('Lawyer', 190000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES

('LeBron', 'James', 1, 1),
('Kevin', 'Durant', 2, 2),
('Stephan', 'Curry', 3, 1),
('James', 'Harden', 4, 3),
('Chris', 'Paul', 5, 1),
('Jayson', 'Tatum', 6, 3),
('Shai', 'Alexander', 7, 2);
