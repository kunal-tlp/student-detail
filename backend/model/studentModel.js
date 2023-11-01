const db = require("../config/db")

var User = function (data) {

}

User.addStudentData = async function (postdata) {
    return new Promise(async function (resolve, reject) {

        try {
            var insertData = {
                name: postdata.name ? postdata.name : "",
                email: postdata.email ? postdata.email : "",
                dob: postdata.dob ? postdata.dob : "",
                address: postdata.address ? postdata.address : "",
                qualification: postdata.qualification ? postdata.qualification : "",
                image: postdata.image ? postdata.image : ""
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

module.exports = User;
