CREATE TABLE "Users" (
  "_id" serial PRIMARY KEY,
  "userId" string,
  "currentSession" integer
);

CREATE TABLE "FitPlan" (
  "_id" serial PRIMARY KEY,
  "userId" integer,
  "sessionTitle" string,
  "sortTitle" string
);

CREATE TABLE "FitCard" (
  "_id" serial PRIMARY KEY,
  "planId" integer,
  "cardTitle" string
);

CREATE TABLE "Activities" (
  "_id" serial PRIMARY KEY,
  "fitCardId" integer,
  "userInputDataId" integer,
  "datum" string,
  "secondary" string,
  "primary" string,
  "video" url,
  "units" string
);

CREATE TABLE "Food" (
  "_id" serial PRIMARY KEY,
  "userId" integer,
  "type" string,
  "time" timestamp,
  "details" string
);

CREATE TABLE "UserInputDataFormat" (
  "_id" serial PRIMARY KEY,
  "activityId" integer,
  "unit" string
);

CREATE TABLE "UserInputtedData" (
  "_id" serial PRIMARY KEY,
  "datum" float
);

ALTER TABLE "FoodTable" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("_id");

ALTER TABLE "FitPlan" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("_id");

ALTER TABLE "FitCard" ADD FOREIGN KEY ("planId") REFERENCES "FitPlan" ("_id");

ALTER TABLE "Activities" ADD FOREIGN KEY ("fitCardId") REFERENCES "FitCard" ("_id");

ALTER TABLE "UserInputDataFormat" ADD FOREIGN KEY ("activityId") REFERENCES "Activities" ("_id");
