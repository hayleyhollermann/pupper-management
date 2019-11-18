const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const queryText = `SELECT "selected_household_id" FROM "user"
        WHERE "user"."id"=$1;`;
    pool.query(queryText, [req.user.id])
        .then((results) => {
            const queryText2 = `SELECT * FROM "pets" 
            JOIN "households" ON "pets"."households_id"="households"."id"
            WHERE "households"."id"=$1;`;
            pool.query(queryText2, [results.rows[0]])
        })
        .catch(error => {
            console.log('Error making SELECT for /user-households:', error);
            res.sendStatus(500);
        });
});

module.exports = router;