INSERT INTO USERS
  (USER_NAME, USER_PASSWORD)
VALUES
  ('AnikaDom', 'nevertheless');

INSERT INTO PLACES (CITY_NAME)
VALUES
  ('madrid'),
  ('new york'),
  ('paris'),
  ('tokio'),
  ('san paolo'),
  ('kiev'),
  ('berlin'),
  ('kyoto'),
  ('lviv'),
  ('london'),
  ('moscow'),
  ('boston'),
  ('chicago'),
  ('los angeles'),
  ('miami');

INSERT INTO TRAVELERS (EMPLOYEE_NAME)
VALUES
  ('abuyan novaxam'),
  ('valery nickols'),
  ('john vatson'),
  ('nickola tesla'),
  ('sherlock holmes'),
  ('mark zuckerberg'),
  ('stive jobs'),
  ('elon mask'),
  ('jeff bezos'),
  ('alan turing');

INSERT INTO TRIPS (EMPLOYEE_ID, CITY_ID, BUDGET, TIME, GOAL, STATUS_TRIP)
VALUES
  (1, 1, 2456.00, '2017-01-01', 'business', 0),
  (2, 2, 1000.00, '2017-02-03', 'test equipment', 0),
  (3, 3, 5670.00, '2017-03-06', 'vacation', 0),
  (4, 4, 2340.00, '2017-03-09', 'business', 0),
  (5, 5, 1000.00, '2017-04-11', 'vacation', 0),
  (6, 6, 9999.00, '2017-11-12', 'sign a contract', 0),
  (7, 7, 1340.00, '2017-05-15', 'training', 0),
  (8, 8, 100.00, '2017-01-18', 'local trip', 0),
  (9, 9, 543.00, '2017-07-21', 'subcontractor issue', 0),
  (10, 10, 8456.00, '2017-10-24', 'exhibition', 0),
  (1, 11, 1904.00, '2018-03-01', 'sing a contract', 1),
  (3, 12, 769.00, '2018-03-05', 'training', 1),
  (2, 5, 7654.00, '2018-03-21', 'exhibition', 1),
  (5, 13, 10.00, '2018-03-10', 'local trip', 1),
  (7, 14, 4187.00, '2018-03-03', 'relocate to local office', 1),
  (9, 15, 2766.00, '2018-03-17', 'vacation', 1),
  (10, 13, 345.00, '2018-06-01', 'interview new candidate', 2),
  (8, 11, 10000.00, '2018-05-13', 'inspection', 2),
  (6, 9, 4356.00, '2018-06-21', 'business', 2),
  (4, 7, 999.00, '2018-07-14', 'training', 2);