const express = require("express")
const router = express.Router();
const studentController = require("../controller/studentController")
const multer = require("multer");
const fs = require("fs");
const path = require("path")

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/uploads/images")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("user_file");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // const folder = file.fieldname === "./public/uploads/images";
//         const folder = file.fieldname === "image" ? "./public/uploads/images" : "./public/uploads/pdfs";
//         cb(null, `./${folder}`);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//     },
// });

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1000000,
//         files: 1,
//     },
// });

router.post('/add-student', upload, studentController.addStudentData);
router.get('/view-all-student', studentController.getAllStudentData);
router.get('/view-student/:id', studentController.getSingleStudentData);
router.post('/delete-student/:id', studentController.deleteStudentData);
router.post('/update-student', studentController.updatedStudentData);

module.exports = router
