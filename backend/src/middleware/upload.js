const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`);
    }
})

const fileFilter = (req, file, cb) => {
    // if (file.mimetype === "application/json") {
    cb(null, true);
    // }else {
    //     cb(null, true);
    // }
}

const limits = {
    fileSize: 10024 * 10024 * 10000000
}


module.exports = multer({storage, fileFilter, limits});
