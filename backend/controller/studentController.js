const db = require("../config/db")
const studentModel = require("../model/studentModel")

exports.addStudentData = async function (req, res) {
    try {
        console.log(req.body, "req.body")
        db.beginTransaction();
        var data = await studentModel.addStudentData(req.body);
        if (data.insertId) {
            db.commit();
            res.status(200).json({ message: "Student added successfull", Data: req.body })
        } else if ("Student email already exists") {
            res.status(401).json({ message: "Email Already exists" })
        } else {
            db.rollback()
            res.status(401).json({ message: "Data Error" })
        }
    } catch (error) {
        console.log(error)
        db.rollback()
        res.status(401).json({ message: "Rollback error" })
    }
}
