const db = require("../pgpool");


const getTopRated = (request, response, next) => {
    console.log('yoyo')
    db.query(`SELECT businesses.name, businesses.images, businesses.tags, COUNT(*) AS count
                FROM businesses
                LEFT JOIN reviews
                ON businesses.name = reviews.name
                GROUP BY businesses.name, businesses.images, businesses.tags
                ORDER BY COUNT(*) desc`, (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows)
    })
}


const getReviews = (request, response, next) => {

    const { name } = request.params;
    console.log(request.params)
    db.query(`SELECT * FROM "reviews"
                WHERE name = $1`, [name], (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows)
    })
}

const getCount = (request, response, next) => {

    const { name } = request.params;
    console.log(request.params)
    db.query(`SELECT COUNT(id) FROM "reviews"
                WHERE name = $1`, [name], (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows)
    })
}

const createReview = (request, response, next) => {
    const body = request.body;
    console.log(body)
    db.query(`INSERT INTO reviews (name, review, reviewer) VALUES ($1, $2, $3)`, [body.name, body.review, body.reviewer], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

module.exports = {
    getReviews,
    getCount,
    createReview,
    getTopRated,
}