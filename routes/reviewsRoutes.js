const express = require('express');
const router = express.Router();
const reviewsQueries = require('../queries/reviewsQueries.js');

router.get('/:name', reviewsQueries.getReviews);

router.get('/count/:name', reviewsQueries.getCount);

router.post('/', reviewsQueries.createReview);

module.exports = router;