CREATE DATABASE TestDatabase;
USE TestDatabase;

CREATE TABLE user(
    id varchar(255) primary key,
    username varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null
);