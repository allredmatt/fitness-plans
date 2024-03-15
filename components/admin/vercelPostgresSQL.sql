CREATE TABLE "Users" (
  "_id" integer PRIMARY KEY,
  "userId" string,
  "currentSession" integer
);

CREATE TABLE "FitPlan" (
  "_id" integer PRIMARY KEY,
  "userId" integer,
  "sessionTitle" string,
  "sortTitle" string
);

CREATE TABLE "FitCard" (
  "_id" integer,
  "planId" integer,
  "cardTitle" string
);

CREATE TABLE "Activities" (
  "_id" integer,
  "fitCardId" integer,
  "userInputDataId" integer,
  "datum" string,
  "secondary" string,
  "primary" string,
  "video" url,
  "units" string
);

CREATE TABLE "FoodTable" (
  "_id" integer,
  "userId" integer,
  "type" string,
  "time" timestamp,
  "details" string
);

CREATE TABLE "UserInputDataTypes" (
  "_id" integer,
  "activityId" integer,
  "unit" string
);

CREATE TABLE "UserInputtedData" (
  "_id" integer,
  "datum" float
);

ALTER TABLE "FoodTable" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("_id");

ALTER TABLE "FitPlan" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("_id");

ALTER TABLE "FitCard" ADD FOREIGN KEY ("planId") REFERENCES "FitPlan" ("_id");

ALTER TABLE "Activities" ADD FOREIGN KEY ("fitCardId") REFERENCES "FitCard" ("_id");

ALTER TABLE "UserInputDataTypes" ADD FOREIGN KEY ("activityId") REFERENCES "Activities" ("_id");
