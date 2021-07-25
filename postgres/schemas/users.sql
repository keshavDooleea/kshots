SET search_path = kshots;

DROP SCHEMA IF EXISTS kshots CASCADE;
CREATE SCHEMA kshots;

CREATE TABLE IF NOT EXISTS Users (
    id 		  INTEGER 	   NOT NULL UNIQUE,
	email	  VARCHAR(255),
    name 	  VARCHAR(255),
	createdAt DATE 		   NOT NULL,
	PRIMARY KEY (id)
);


