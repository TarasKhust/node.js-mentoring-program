-- Creation of product table
CREATE TABLE IF NOT EXISTS users (
  id varchar(200) NOT NULL,
  login VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  age VARCHAR(255) NOT NULL,
  isDelete VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  PRIMARY KEY (id)
);
