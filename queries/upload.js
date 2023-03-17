const multer = require('multer');

const multerConfig = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'client/public/');
    },
    filename: (request, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, file.originalname);
    },
})

const isImage = (request, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Only image is allowed...'))
    }
}

const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
});

exports.uploadImage = upload.single('photo');

exports.upload = (request, response) => {
    console.log(request.file)
    response.status(200).json(request.file)
}
