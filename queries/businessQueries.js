const db = require("../pgpool");


const getAll = (request, response, next) => {
    db.query(`SELECT * FROM "businesses"`, (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows)
    })
}

/*
create or replace function reverse_like (text, text) returns boolean language sql as
 $$ select $2 like $1 $$ immutable parallel safe;
 create operator <~~ ( function =reverse_like, leftarg = text, rightarg=text );
*/

const getAllLike = (request, response, next) => {

    let { input } = request.params;
    input = input.replace("'", '');
    db.query(`SELECT * from "businesses" where '%${input}%' <~~ ANY(tags)`, (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows)
    })
}

const getIndividualBusiness = (request, response, next) => {
    const { name } = request.params;
    db.query(`SELECT * FROM "businesses"
                WHERE name = $1`, [name], (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows)
    })
}

const getBusinessImages = (request, response, next) => {
    const { name } = request.params;
    db.query(`SELECT images FROM "businesses"
                WHERE name = $1`, [name], (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows)
    })
}

const getByEmail = (request, response, next) => {
    const { email } = request.params;
    db.query(`SELECT * FROM "businesses"
                WHERE email = $1`, [email], (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows)
    })
}

const createBusiness = (request, response, next) => {
    const body = request.body;

    db.query(`INSERT INTO "businesses" (name, description, images, address, tags, email)
            VALUES ($1, $2, $3, $4, $5, $6)`, [body.name, body.description, body.images, body.address, body.tags, body.email], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

const createImages = (request, response, next) => {
    const body = request.body;
    console.log(body)

    db.query(`INSERT INTO "businesses" (images)
            VALUES ($1)`, [body.images], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

module.exports = {
    getAll,
    getAllLike,
    getIndividualBusiness,
    getBusinessImages,
    getByEmail,
    createBusiness,
    createImages,
}