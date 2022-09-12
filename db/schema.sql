DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;

USE inventory_db;

CREATE TABLE books(
  id INTEGER NOT NULL,
  title VARCHAR(30) NOT NULL
  author
  genre
  publication-year
);

CREATE TABLE author(
  id INTEGER NOT NULL,
  first_name VARCHAR(30) NOT NULL
  last_name
);

CREATE TABLE book_author(
  book_id INTEGER NOT NULL,
  author_id DECIMAL(10,2) NOT NULL
);

CREATE TABLE member(
    id 
    first_name
    last_name
    joined_date
    status
)