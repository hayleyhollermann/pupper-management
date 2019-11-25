const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//--------GETS---------
// GET all pets in a household
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in get /pets', req.user);
    // select current household ID of user
    const queryText = `SELECT "selected_household_id" FROM "user"
        WHERE "id"=$1;`;
    pool.query(queryText, [req.user.id])
        .then((results) => {
            // gets all pets in current household
            const queryText2 = `SELECT "pets"."name" AS "pet_name", "pets"."id", "pets"."households_id", "households"."name", "pets"."breed", "pets"."vet_name", "pets"."vet_phone", "pets"."age", "pets"."weight" FROM "pets" 
            JOIN "households" ON "pets"."households_id"="households"."id"
            WHERE "households"."id"=$1 ORDER BY "pets"."id";`;
            pool.query(queryText2, [results.rows[0].selected_household_id])
            .then((results) => {
                res.send(results.rows)
            })
            .catch((err) => {
                console.log('error in select pets in a household', err);
                res.sendStatus(500)
            })
        })
        .catch(error => {
            console.log('Error making SELECT for /user-households:', error);
            res.sendStatus(500);
        });
});
// GET all info on a given pet
router.get('/petInfo/:id', rejectUnauthenticated, (req, res) => {
    console.log('in get /pets/petInfo', req.params.id);
    queryText = `SELECT "pets".*, "households_users"."users_id" FROM "pets"
    JOIN "households_users" ON "households_users"."households_id" = "pets"."households_id"
    WHERE "pets"."id" = $1 AND "households_users"."users_id" = $2;`
    pool.query(queryText, [req.params.id, req.user.id])
        .then((results) => {
            res.send(results.rows[0])
        })
        .catch((err) => {
            console.log('error in get /pets/petInfo', err);
            res.sendStatus(500)
        })
})
// GET recent events for a given pet
router.get('/events/:id', rejectUnauthenticated, (req, res) => {
    console.log('in get /pets/events', req.params.id);
    queryText = `SELECT max("pets_events"."time") AS "time",  "pets"."id", "pets"."name", "events"."type" AS "event_type", "medications"."type", "medications"."id"  AS "med_id" FROM "pets_events" 
        JOIN "events" ON "events"."id"="pets_events"."events_id"
        JOIN "pets" ON "pets"."id"="pets_events"."pets_id"
        LEFT OUTER JOIN "medications" ON "medications"."id"="pets_events"."medications_id"
        WHERE ("pets"."id"=$1)
        GROUP BY "pets"."id", "events"."type", "pets"."name", "events"."type", "medications"."type", "med_id";`
    pool.query(queryText, [req.params.id])
        .then((results) => {
            res.send(results.rows)
        })
        .catch((err) => {
            console.log('error in get /pets/events', err);
            res.sendStatus(500)
        })
})
// GET recent events for all pets in househiold
router.get('/hh-events', rejectUnauthenticated, (req, res) => {
    console.log('in /hh-events', req.user.selected_household_id);
    queryText = `SELECT max("pets_events"."time") AS "time",  "pets"."id", "pets"."name", "events"."type" AS "event_type", "medications"."type", "medications"."id" AS "med_id" FROM "pets_events" 
        JOIN "events" ON "events"."id"="pets_events"."events_id"
        JOIN "pets" ON "pets"."id"="pets_events"."pets_id"
        JOIN "households" ON "pets"."households_id" = "households"."id"
        LEFT OUTER JOIN "medications" ON "medications"."id"="pets_events"."medications_id"
        WHERE ("households"."id"=$1)
        GROUP BY "pets"."id", "events"."type", "pets"."name", "events"."type", "medications"."type", "med_id";`
    pool.query(queryText, [req.user.selected_household_id])
        .then((results) => {
            res.send(results.rows)
        })
        .catch((err) => {
            console.log('error in get /pets/hh-events', err);
        })
})

//----------POSTS----------
// ADD a pet to a household
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in post /pets', req.body)
    queryText = `INSERT INTO "pets" ("name", "households_id", "breed", "weight", "age", "vet_name", "vet_phone")
        VALUES ($1, $2, $3, $4, $5, $6, $7);`
    pool.query(queryText, [req.body.name, req.body.householdId, req.body.breed, req.body.weight, req.body.age, req.body.vetName, req.body.vetPhone])
    .then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error adding a pet in POST /pets', err);
        res.sendStatus(500);
    })
})
// ADD a new event for a pet 
router.post('/events/:id', rejectUnauthenticated, (req, res) => {
    console.log('in post /pets/events', req.params.id, req.body);
    queryText = `INSERT INTO "pets_events" ("pets_id", "time", "events_id")
    VALUES ($1, $2, (SELECT "id" FROM "events" WHERE "type" = $3));`
    pool.query(queryText, [req.params.id, req.body.time, req.body.event_type])
    .then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error adding an event in POST /pets/events', err);
        res.sendStatus(500)
    })
})

router.post('/events/meds/:id', rejectUnauthenticated, (req, res) => {
    console.log('in post /pets/events', req.params.id, req.body);
    queryText = `INSERT INTO "pets_events" ("pets_id", "time", "events_id", "medications_id")
    VALUES ($1, $2, $3, $4);`
    pool.query(queryText, [req.params.id, req.body.time, '4', req.body.med_type])
    .then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('error adding an event in POST /pets/events/meds', err);
        res.sendStatus(500)
    })
})


module.exports = router;