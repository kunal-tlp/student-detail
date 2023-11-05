const db = require("../config/db")
const studentModel = require("../model/studentModel")

exports.addStudentData = async function (req, res) {
    try {
        db.beginTransaction();
        var data = await studentModel.addStudentData(req.body, req.files);
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

exports.getAllStudentData = async (req, res) => {
    try {
        db.query("SELECT * FROM ps_students ORDER BY id asc",
            function (err, data) {
                if (err) {
                    res.status(500).send({ error: "Data not found" });
                } else {
                    res.status(201).send({ message: "All Student Data", Data: data });
                }
            });
    } catch (error) {
        db.commit();
        res.status(401).json({ error: "Data Error" });
    }
}

exports.getSingleStudentData = async (req, res) => {
    const studentId = req.params.id;
    try {
        db.query("SELECT * FROM ps_students WHERE id = ?",
            [studentId], function (err, data) {
                if (err) {
                    res.status(401).send({ error: "Data not found" })
                } else {
                    res.status(201).send({ message: "Student Data", Data: data })
                }
            });
    } catch (error) {
        db.rollback();
        res.status(401).json({ error: "Data error" });
    }
}

exports.deleteStudentData = async (req, res) => {
    const studentId = req.params.id;
    try {
        db.beginTransaction();
        var deletedData = await studentModel.deleteStudentData(studentId);

        if (deletedData.affectedRows) {
            db.commit();
            res.status(201).json({ message: "Student Deleted Successfull" });
        } else {
            db.rollback();
            res.status(401).json({ error: "Data error" })
        }
    } catch (error) {
        db.rollback();
        res.status(401).json({ error: error })
    }
}

exports.updatedStudentData = async (req, res) => {
    try {
        db.beginTransaction();
        var studentData = await studentModel.changeStudentData(req.body);
        if (studentData.affectedRows) {
            db.commit();
            res.status(201).json({ message: "Student data has been updated successfull", data: req.body })
        } else {
            db.rollback();
            res.status(401).json({ message: "Student Data has not updated" });
        }
    } catch (error) {
        db.rollback();
        res.status(401).json({ error: error });
    }
}
