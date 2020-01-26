-- seed file to pre-populate database for test purposes
-- test company: popcom, black woman founded automated retail & blockchain company

--- 1) make departments
--- 2) make roles corresponding to departments
--- 3) make employees corresponding to roles
--- (replicate later with class constructors)

-- select database to use
use employeeTracker_db;

-- insert into seed values
-- departments
insert into department (name)
values ("Executive");

insert into department (name)
values ("Engineering");

insert into department (name)
values ("Design");

insert into department (name)
values ("Human Resources");

-- roles
insert into role (title, salary, department_id)
values ("Chief Executive Officer", 999999, 1);

insert into role (title, salary, department_id)
values ("Chief Technical Officer", 800000, 1);

insert into role (title, salary, department_id)
values ("Head of Product", 700000, 2);

insert into role (title, salary, department_id)
values ("Head of Product, Hardware", 650000, 2);

insert into role (title, salary, department_id)
values ("Lead Developer", 500000, 2);

insert into role (title, salary, department_id)
values ("Product Development", 500000, 3);

insert into role (title, salary, department_id)
values ("Technical Product Manager", 200000, 3);

insert into role (title, salary, department_id)
values ("CX/UX", 200000, 3);

insert into role (title, salary, department_id)
values ("Software Developer", 100000, 2);

insert into role (title, salary, department_id)
values ("Human Resources", 75000, 4);

insert into role (title, salary, department_id)
values ("Exective Assistant", 60000, 1);

-- employees
insert into employee (first_name, last_name, role_id, manager_id)
values ("Dawn", "Dickson", 1, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Dan", "Rockwell", 2, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Jared", "Korinko", 3, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Lucas", "Williamson", 4, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Tushar", "Kulkarni", 5, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Kaleem", "Musa", 6, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Paul", "Cook", 7, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Pat", "Camp", 8, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Aukit", "Choudhury", 9, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Chelsa", "Savage", 10, null);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Auddy", "Arijit", 11, null);

-- update employees with managers
-- ceo manages cto
update employee set manager_id = 1 where role_id = 2;

-- cto manages head of product
update employee set manager_id = 2 where role_id = 3; 

-- head of product manages head of prod, hardware
update employee set manager_id = 3 where role_id = 4; 

-- head of prod hardware manages lead developer
update employee set manager_id = 4 where role_id = 5; 

-- head of prod hardware manages product dev
update employee set manager_id = 4 where role_id = 6; 

-- product dev manages technical product manager
update employee set manager_id = 6 where role_id = 7; 

-- product dev manages cx/ux
update employee set manager_id = 6 where role_id = 8; 

-- lead developer manages software developer
update employee set manager_id = 5 where role_id = 9; 

-- ceo manages hr
update employee set manager_id = 1 where role_id = 10; 

-- ceo manages executive assistant
update employee set manager_id = 1 where role_id = 11; 
