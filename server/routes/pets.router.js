const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in get /pets', req.user);
    const queryText = `SELECT "selected_household_id" FROM "user"
        WHERE "id"=$1;`;
    pool.query(queryText, [req.user.id])
        .then((results) => {
            // console.log(results.rows);            
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

router.get('/petInfo/:id', rejectUnauthenticated, (req, res) => {
    console.log('in get /pets/petInfo', req.params.id);
    queryText = `SELECT * FROM "pets"
    WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
        .then((results) => {
            res.send(results.rows[0])
        })
        .catch((err) => {
            console.log('error in get /pets/petInfo', err);
            res.sendStatus(500)
        })
})

router.get('/events/:id', rejectUnauthenticated, (req, res) => {
    console.log('in get /pets/events', req.params.id);
        queryText = `SELECT max("pets_events"."time") AS "time",  "pets"."id", "pets"."name", "events"."type" AS "event_type", "medications"."type", "medications"."id" FROM "pets_events" 
            JOIN "events" ON "events"."id"="pets_events"."events_id"
            JOIN "pets" ON "pets"."id"="pets_events"."pets_id"
            LEFT OUTER JOIN "medications" ON "medications"."id"="pets_events"."medications_id"
            WHERE ("pets"."id"=$1)
            GROUP BY "pets"."id", "events"."type", "pets"."name", "events"."type", "medications"."type", "medications"."id";`
    pool.query(queryText, [req.params.id])
        .then((results) => {
            res.send(results.rows)
        })
        .catch((err) => {
            res.sendStatus(500)
        })
})

module.exports = router;