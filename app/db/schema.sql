CREATE DATABASE tickets_app;

USE tickets_app;

CREATE TABLE users (
	`userId` int(11) NOT NULL AUTO_INCREMENT,
	`username` varchar(100) DEFAULT NULL,
	`password` varchar(100) DEFAULT NULL,
	PRIMARY KEY (`userId`),
	UNIQUE KEY `username` (`username`)
);

ALTER TABLE users ADD email varchar(100) NOT NULL;
ALTER TABLE users ADD first_name varchar(100) NOT NULL;
ALTER TABLE users ADD last_name varchar(100) NOT NULL;

CREATE TABLE entrees(
	id int NOT NULL AUTO_INCREMENT,
	entree_name BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE apps(
	id int NOT NULL AUTO_INCREMENT,
	app_name BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE salads(
	id int NOT NULL AUTO_INCREMENT,
	salad_name BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE fry(
	id int NOT NULL AUTO_INCREMENT,
	fry_name BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE desserts(
	id int NOT NULL AUTO_INCREMENT,
	dessert_name BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE drinks(
	id int NOT NULL AUTO_INCREMENT,
	drink_name BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE orders(
	id int NOT NULL AUTO_INCREMENT,
	entrees_id int NOT NULL,
	app_id int NOT NULL,
	salad_id int NOT NULL,
	frys_id int NOT NULL,
	dessert_id int NOT NULL,
	FOREIGN KEY (entrees_id) REFERENCES entrees(id),
	FOREIGN KEY (app_id) REFERENCES apps(id),
	FOREIGN KEY (salad_id) REFERENCES salads(id),
	FOREIGN KEY (frys_id) REFERENCES fry(id),
	FOREIGN KEY (dessert_id) REFERENCES desserts(id),
	PRIMARY KEY (id)
);

ALTER TABLE orders ADD user_id int NOT NULL;
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE orders ADD time varchar(100) NOT NULL;

SET GLOBAL event_scheduler = ON;

CREATE EVENT order_reset
  ON SCHEDULE
    EVERY 1 DAY
    STARTS CURRENT_TIMESTAMP 
COMMENT 'Calls timer procedure to delete stored orders every day'
  DO
	CALL timer();

