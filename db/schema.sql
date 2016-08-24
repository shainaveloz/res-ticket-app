CREATE DATABASE tickets_app;

USE tickets_app;

CREATE TABLE users (
	`userId` int(11) NOT NULL AUTO_INCREMENT,
	`username` varchar(100) DEFAULT NULL,
	`password` varchar(100) DEFAULT NULL,
	PRIMARY KEY (`userId`),
	UNIQUE KEY `username` (`username`)
)