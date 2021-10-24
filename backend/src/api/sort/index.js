const express = require('express');
const controller = require('./controller');
const router = express.Router();


// localhost:5000/api/sort/start_sort
router.post('/start_sort', controller.start_sort);

// localhost:5000/api/sort/atop_sort
router.post('/stop_sort', controller.stop_sort);


module.exports = router;
