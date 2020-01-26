-- drop employee tracker database if it already exists
drop database if exists employeeTracker_db

-- create employee tracker database
create database employeeTracker_db;

-- use enployee tracker database
use employeeTracker_db;

-- create departments table
create table department (
    id int not null auto_increment,
    name varchar(30) not null,
    PRIMARY KEY (id)
);

-- create role table
create table role (
    id int not null auto_increment,
    title varchar(30) not null,
    salary DECIMAL(6,0) not null,
    department_id INT not NULL,
    PRIMARY KEY (id)
);

-- create employee table
create table employee (
    id INT not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int,
    primary key (id)
);