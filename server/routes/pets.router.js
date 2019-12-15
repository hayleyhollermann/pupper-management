const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//--------GETS---------
// GET all pets in a household
router.get('/', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "pets"."name" AS "pet_name", "pets"."id", "pets"."households_id", "households"."name", "pets"."breed", "pets"."vet_name", "pets"."vet_phone", "pets"."age", "pets"."weight", "households_users"."is_admin" FROM "pets" 
        JOIN "households" ON "pets"."households_id"="households"."id"
        JOIN "households_users" ON "households"."id" = "households_users"."households_id"
        WHERE "households"."id"=$1 AND "households_users"."users_id" = $2
        ORDER BY "pets"."id";`;
    pool.query(queryText, [req.user.selected_household_id, req.user.id])
        .then((results) => res.send(results.rows))
        .catch((err) => {
            console.log('error in select pets in a household', err);
            res.sendStatus(500)
        })
});
// GET all info on a given pet
router.get('/petInfo/:id', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "pets".*, "households_users"."users_id", "households_users"."is_admin" FROM "pets"
        JOIN "households_users" ON "households_users"."households_id" = "pets"."households_id"
        WHERE "pets"."id" = $1 AND "households_users"."users_id" = $2;`
    pool.query(queryText, [req.params.id, req.user.id])
        .then((results) => res.send(results.rows[0]))
        .catch((err) => {
            console.log('error in get /pets/petInfo', err);
            res.sendStatus(500)
        })
})
// GET all medications for a dog
router.get('/petInfo/meds/:id', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "pets"."id", "medications"."id" AS "med_id", "medications"."quantity", "medications"."frequency", "medications"."type" FROM "pets"
        JOIN "medications" ON "pets"."id" = "medications"."pets_id"
        WHERE "pets"."id"=$1;`
    pool.query(queryText, [req.params.id])
        .then((results) => res.send(results.rows))
        .catch((err) => {
            console.log('error in get /pets/petInfo/meds', err);
            res.sendStatus(500)
        })
})
// GET recent events for a given pet
router.get('/events/:id', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT max("pets_events"."time") AS "time",  "pets"."id", "pets"."name", "events"."type" AS "event_type" FROM "pets_events" 
        JOIN "events" ON "events"."id"="pets_events"."events_id"
        JOIN "pets" ON "pets"."id"="pets_events"."pets_id"
        WHERE ("pets"."id"=$1)
        GROUP BY "pets"."id", "events"."type", "pets"."name", "events"."type";`
    pool.query(queryText, [req.params.id])
        .then((results) => res.send(results.rows))
        .catch((err) => {
            console.log('error in get /pets/events', err);
            res.sendStatus(500)
        })
})
// GET recent events for all pets in househiold
router.get('/hh-events', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT max("pets_events"."time") AS "time",  "pets"."id", "pets"."name", "events"."type" AS "event_type" FROM "pets_events" 
        JOIN "events" ON "events"."id"="pets_events"."events_id"
        JOIN "pets" ON "pets"."id"="pets_events"."pets_id"
        JOIN "households" ON "pets"."households_id" = "households"."id"
        WHERE ("households"."id"=$1)
        GROUP BY "pets"."id", "events"."type", "pets"."name", "events"."type";`
    pool.query(queryText, [req.user.selected_household_id])
        .then((results) => res.send(results.rows))
        .catch((err) => {
            console.log('error in get /pets/hh-events', err);
        })
})
// GET all events of one type for a pet
router.get('/events-one-type', rejectUnauthenticated, (req, res) => {
    queryText = `SELECT "pets"."id" AS "pet_id", "pets_events"."id", "pets"."name", "pets_events"."time", "events"."type" FROM "pets_events" 
        JOIN "events" ON "events"."id"="pets_events"."events_id"
        JOIN "pets" ON "pets"."id"="pets_events"."pets_id"
        JOIN "households_users" ON "households_users"."households_id" = "pets"."households_id"
        WHERE "pets"."id"=$1 AND "events"."id"=(SELECT "events"."id" FROM "events" WHERE "events"."type"=$2) 
        AND "households_users"."users_id" = $3
        ORDER BY "pets_events"."time" DESC
        LIMIT 2;`
    pool.query(queryText, [req.query.petId, req.query.eventType, req.user.id])
        .then((results) => res.send(results.rows))
        .catch((err) => {
            console.log('error in get /events/one-type', err);
        })
})
//----------POSTS----------
// ADD a pet to a household
router.post('/', rejectUnauthenticated, (req, res) => {
    queryText = `INSERT INTO "pets" ("name", "households_id", "breed", "weight", "age", "vet_name", "vet_phone")
        VALUES ($1, $2, $3, $4, $5, $6, $7);`
    pool.query(queryText, [req.body.name, req.body.householdId, req.body.breed, req.body.weight, req.body.age, req.body.vetName, req.body.vetPhone])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('error adding a pet in POST /pets', err);
            res.sendStatus(500);
        })
})
// ADD new med for pet
router.post('/petInfo/meds', rejectUnauthenticated, (req, res) => {
    queryText = `INSERT INTO "medications" ("pets_id", "type", "quantity", "frequency")
        VALUES ($1, $2, $3, $4);`
    pool.query(queryText, [req.body.petId, req.body.medToAdd.med_name, req.body.medToAdd.quantity, req.body.medToAdd.frequency])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('error adding a pet in POST /pets/petInfo/meds', err);
            res.sendStatus(500);
        })
})
// ADD a new event for a pet 
router.post('/events/:id', rejectUnauthenticated, (req, res) => {
    queryText = `INSERT INTO "pets_events" ("pets_id", "time", "events_id")
        VALUES ($1, $2, (SELECT "id" FROM "events" WHERE "type" = $3));`
    pool.query(queryText, [req.params.id, req.body.time, req.body.event_type])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('error adding an event in POST /pets/events', err);
            res.sendStatus(500)
        })
})
// ------ PUT's -------
// UPDATE pet information
router.put('/petInfo', rejectUnauthenticated, (req, res) => {
    queryText=`UPDATE "pets"
        SET "weight" = $1, "age"= $2, "vet_name"=$3, "vet_phone"=$4
        WHERE "id"=$5;`
    pool.query(queryText, [req.body.editInfo.weight, req.body.editInfo.age, req.body.editInfo.vetName, req.body.editInfo.vetPhone, req.body.petId])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('error adding an event in PUT /pets/petInfo', err);
            res.sendStatus(500)
        })
})
// ----- DELETE's -------
//DELETE a pets medication
router.delete('/petInfo/meds/:id', rejectUnauthenticated, (req, res) => {
    console.log('in DELETE with med:', req.params.id);
    queryText = `DELETE FROM "medications"
        WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('error in DELETE /petInfo/meds/:id', err);
            res.sendStatus(500)
        })
})

module.exports = router;