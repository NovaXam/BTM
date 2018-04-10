CREATE TABLE USERS (
  ID serial,
  USER_NAME VARCHAR(100) NOT NULL,
  USER_PASSWORD VARCHAR(100) NOT NULL
);

CREATE TABLE PLACES (
  CITY_ID serial PRIMARY KEY,
  CITY_NAME VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE TRAVELERS (
  EMPLOYEE_ID serial PRIMARY KEY,
  EMPLOYEE_NAME VARCHAR(100) NOT NULL UNIQUE,
  POSITION VARCHAR(100),
  PHONE VARCHAR(100),
  EMAIL VARCHAR(100)
);

CREATE TABLE TRIPS (
  ID serial,
  EMPLOYEE_ID BIGINT NOT NULL references TRAVELERS(EMPLOYEE_ID),
  CITY_ID BIGINT NOT NULL references PLACES(CITY_ID),
  BUDGET FLOAT(2),
  TIME DATE,
  GOAL VARCHAR(256),
  STATUS_TRIP INT NOT NULL
);