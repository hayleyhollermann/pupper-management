const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const queryText = `SELECT "households"."id", "households"."name", "households_users"."users_id", "user"."username", "households_users"."is_admin", "user"."selected_household_id" FROM "households"
    JOIN "households_users" ON "households_users"."households_id"="households"."id"
    JOIN "user" ON "user"."id"="households_users"."users_id"
    WHERE "user"."id"=$1;`;
    pool.query(queryText, [req.user.id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for /user-households:', error);
            res.sendStatus(500);
        });
});

router.get('/pets', rejectUnauthenticated, (req, res) => {
    console.log('in get /pets', req.user);
    const queryText = `SELECT "selected_household_id" FROM "user"
        WHERE "id"=$1;`;
    pool.query(queryText, [req.user.id])
        .then((results) => {
            // console.log(results.rows);            
            const queryText2 = `SELECT "pets"."name" AS "pet_name", "pets"."id", "pets"."households_id", "households"."name", "pets"."breed", "pets"."vet_name", "pets"."vet_phone", "pets"."age", "pets"."weight" FROM "pets" 
            JOIN "households" ON "pets"."households_id"="households"."id"
            WHERE "households"."id"=$1;`;
            pool.query(queryText2, [results.rows[0].selected_household_id])
            .then((results) => {
                res.send(results.rows)
            })
        })

        .catch(error => {
            console.log('Error making SELECT for /user-households:', error);
            res.sendStatus(500);
        });
});

module.exports = router;