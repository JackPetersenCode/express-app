const express = require('express');
const router = express.Router();
const chatQueries = require('../queries/chatQueries.js');

router.post('/', chatQueries.askPrompt);

module.exports = router;