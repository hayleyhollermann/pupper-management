const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');

// GETs all households user is in
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const queryText = `SELECT "households"."id", "households"."name", "households_users"."users_id", "user"."username", "households_users"."is_admin", "user"."selected_household_id" FROM "households"
    JOIN "households_users" ON "households_users"."households_id"="households"."id"
    JOIN "user" ON "user"."id"="households_users"."users_id"
    WHERE "user"."id"=$1;`;
    pool.query(queryText, [req.user.id])
        .then((results) => res.send(results.rows))
        .catch(err => {
            console.log('Error making SELECT for /user-households:', err);
            res.sendStatus(500);
        });
});
// PUT changes selected_household_id
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('user:', req.user, 'hh id:', req.body.selected_id); 
    queryText=`UPDATE "user" 
        SET "selected_household_id" = $1
        WHERE "id"=$2;`
    pool.query(queryText, [req.body.selected_id, req.user.id])
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('error changing household :', err)
            res.sendStatus(500)
        })
})
// POST adds a new household and sets that user as admin
router.post('/', rejectUnauthenticated, (req, res) => {
    // adds new household to household table
    console.log('add a household in POST /user-households');
    queryText=`INSERT INTO "households" ("name") VALUES ($1);`;
    pool.query(queryText, [req.body.householdName])
        .then(() => {
            // adds user and new household to users_households table, sets user as admin 
            queryText2 = `INSERT INTO "households_users" ("households_id", "users_id", "is_admin")
                VALUES ((SELECT "id" FROM "households" WHERE "name"=$1), $2, 'true');`;
            pool.query(queryText2, [req.body.householdName, req.user.id])
            .then(() => res.sendStatus(200))
            .catch((err) =>{
                console.log('error in 2nd query of POST /user-households', err);
                res.sendStatus(500)
            })
        })
        .catch((err) =>{
            console.log('error in first query of POST /user-households', err);
            res.sendStatus(500)
        })
})

module.exports = router;