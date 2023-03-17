const express = require('express');
const router = express.Router();
const businessQueries = require('../queries/businessQueries.js');
const {uploadImage, upload} = require('../queries/upload.js')

router.get('/searchAll', businessQueries.getAll);

router.get('/getAllLike/:input', businessQueries.getAllLike);

router.get('/:name', businessQueries.getIndividualBusiness);

router.get('/images/:name', businessQueries.getBusinessImages);

router.post('/', businessQueries.createBusiness);

router.get('/email/:email', businessQueries.getByEmail);

router.post('/image', uploadImage, upload);

router.post('/insertimages', businessQueries.createImages);

module.exports = router;