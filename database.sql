CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"selected_household_id" INT REFERENCES "households"
);

CREATE TABLE "households" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100) UNIQUE NOT NULL
);

CREATE TABLE "households_users" (
	"id" SERIAL PRIMARY KEY,
	"households_id" INT REFERENCES "households",
	"users_id" INT REFERENCES "user",
	"is_admin" BOOLEAN
);

CREATE TABLE "pets" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50) NOT NULL,
	"households_id" INT REFERENCES "households",
	"breed" VARCHAR (100),
	"weight" INT,
	"age" INT
);
ALTER TABLE "pets"
ADD COLUMN "vet_name" VARCHAR (200);
ALTER TABLE "pets"
ADD COLUMN "vet_phone" VARCHAR (20);

CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (150)
);

CREATE TABLE "pets_events" (
	"id" SERIAL PRIMARY KEY,
	"pets_id" INT REFERENCES "pets",
	"time" TIMESTAMP,
	"events_id" INT REFERENCES "events",
);

CREATE TABLE "medications" (
	"id" SERIAL PRIMARY KEY,
	"pets_id" INT REFERENCES "pets",
	"type" VARCHAR (200),
	"quantity" VARCHAR (50),
	"frequency" VARCHAR (50)
);

-- INSERTS --
INSERT INTO "user" ("username", "password") VALUES 
    ('hayley', '$2b$10$he/oKDWjWOHTJUy.xyE4puAaCzEBzjPRIMs3HiJvxmke2lwPUJj8C'), 
    ('jordan', '$2b$10$9i6SCCH7891ik8wa3lvI7.4Q0ngWPFMQObZU5QixRmKRGb9kt306a'), 
    ('heather', '$2b$10$7a.YE/V.WrUqzqGXWjDfn.QOYy0qAQxbLotXjyJTENXml0O8zh/wy'), 
    ('pam', '$2b$10$hTAdVJkayfxzuo5jxatb9.1nJ8KCIBa.t70RVQXo4Vm0SuvdoCwMS');
INSERT INTO "households" ("name") VALUES 
    ('hollermann-ross'), ('unit-60');
INSERT INTO "households_users" ("households_id", "users_id", "is_admin") VALUES 
    ('1', '1', 'true'), ('1', '2', 'false'), ('2', '3', 'true');
INSERT INTO "pets" ("name", "households_id", "breed", "weight", "age") VALUES 
    ('Hartley', '1', 'Yorkie Mix', '12', '3'), ('Bagley', '1', 'Great Pyrenese', '110', '1');
INSERT INTO "medications" ("pets_id", "type", "quantity", "frequency") VALUES 
    ('1', 'Bravecto', 'one pill', 'every 3 months'), 
    ('1', 'Sentinel', 'one tab', 'monthly'), 
    ('2', 'Bravecto', 'one pill', 'every 3 months'), 
    ('2', 'Sentinel', 'one tab', 'monthly');
INSERT INTO "events" ("type") VALUES 
    ('fed'), ('walked'), ('last outside');
INSERT INTO "pets_events" ("pets_id", "time", "events_id") VALUES 
    ('1', 'now', '1'),  ('2', 'now', '2');
