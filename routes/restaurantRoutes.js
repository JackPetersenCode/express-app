const express = require('express');
const router = express.Router();
const restaurantQueries = require('../queries/restaurantQueries');

router.get('/getAll', restaurantQueries.getAll);



module.exports = router;