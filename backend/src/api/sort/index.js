const express = require('express');
const controller = require('./controller');
const router = express.Router();
const upload = require('../../middleware/upload');


// localhost:5000/api/sort/start_sort
router.post('/start_sort', controller.start_sort);

// localhost:5000/api/sort/atop_sort
router.post('/stop_sort', controller.stop_sort);

// localhost:5000/api/sort/atop_sort
router.get('/file_list', controller.file_list);

// localhost:5000/api/sort/input_file
router.post('/input_file', upload.single('file'), controller.input_file);


module.exports = router;
