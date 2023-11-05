const db = require("../config/db")
const path = require("path");
var User = function (data) {}

User.addStudentData = async function (postdata, files) {
    return new Promise(async function (resolve, reject) {
        // console.log(postdata, "postdata------")
        // console.log(files, "file------")
        // const studentImg = files.image[0];
        // const student_img = "/uploads/images/" + studentImg.filename;
        try {
            var insertData = {
                name: postdata.name ? postdata.name : "",
                email: postdata.email ? postdata.email : "",
                dob: postdata.dob ? postdata.dob : "",
                address: postdata.address ? postdata.address : "",
                qualification: postdata.qualification ? postdata.qualification : "",
                // image: student_img,
            }
            var checkQuery = "SELECT email FROM ps_students WHERE email = ?";
            db.query(checkQuery, [insertData.email], (err, rows) => {
                if (err) {
                    return reject(err)
                }
                if (rows.length > 0) {
                    return resolve("Student email already exists")
                } else {
                    var queryinsert = "INSERT INTO ps_students SET ?";
                    db.query(queryinsert, insertData, function (err, res) {
                        if  (err) {
                            return reject(err)
                        } else {
                            return resolve(res)
                        }
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    })
}

User.deleteStudentData = async function (postdata) {
    return new Promise((resolve, reject) => {
        const userId = postdata;
        const queryString = "DELETE FROM ps_students WHERE id = ?";
        const filter = [userId];
        db.query(queryString, filter, function (err, res) {
            if (err) {
                return reject(err);
            } else {
                if (res.affectedRows === 0) {
                    return reject("Data was not found")
                }
                return resolve(res);
            }
        });
    });
}

User.changeStudentData = async function (postdata) {
    return new Promise((resolve, reject) => {
        var updatedValues = {
            id: postdata.id,
            name: postdata.name,
            email: postdata.email,
            dob: postdata.dob,
            address: postdata.address,
            qualification: postdata.qualification,
        };
        var queryString = "UPDATE ps_students set ? WHERE id = ?";
        var filter = [updatedValues, postdata.id];
        db.query(queryString, filter, function (err, res) {
            if (err) {
                return reject(err);
            } else {
                return resolve(res);
            }
        });
    })
}

module.exports = User;
