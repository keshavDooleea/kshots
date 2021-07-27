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

CREATE TABLE IF NOT EXISTS Folders (
    id 		  SERIAL 	   NOT NULL UNIQUE,
	userId    INTEGER	   NOT NULL,	
	name	  VARCHAR(255) NOT NULL,
	color	  VARCHAR(255) NOT NULL,
	islock	  BOOLEAN	   NOT NULL,		
	createdAt DATE 		   NOT NULL,
	
	PRIMARY KEY (id),
	FOREIGN KEY (userId)   REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Images (
	id 		  		SERIAL 	   		NOT NULL UNIQUE,
	userid	  		INTEGER	   		NOT NULL,
	folderid  		INTEGER	   		NOT NULL,
	src		  		BYTEA		   	NOT NULL,
	createdAt 		DATE 		   	NOT NULL,
	title	  		VARCHAR(255),
	description		TEXT,
	
	PRIMARY KEY (id),
	FOREIGN KEY (userId)  	 REFERENCES Users(id),
	FOREIGN KEY (folderid)   REFERENCES Folders(id)
)
