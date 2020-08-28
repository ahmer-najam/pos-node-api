const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const Employee = mongoose.model("Employee");
const EmployeePic = mongoose.model("EmployeePic");

router.get("/list", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});

router.get("/one", (req, res) => {
  Employee.find({ _id: req.body._id }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});

router.post("/", (req, res) => {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      console.log("Error during record insertion : " + err);
    }
  });
});

router.put("/", (req, res) => {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log("Error during record update : " + err);
      }
    }
  );
});

//Uploading Config
cloudinary.config({
  cloud_name: "dyng2fvrr",
  api_key: "252854336132114",
  api_secret: "inokgYUS3MiSgKPFCzLpKwiQCIw",
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `NodeServer-${file.originalname}`);
  },
});

var upload = multer({ storage: storage });
//Uploading Config

//file Uploader
// router.post("/file", upload.single("file"), (req, res, next) => {
router.post("/file", upload.single("file"), (req, res, next) => {
  const file = req.file;

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  let employeePic = new EmployeePic();
  let apiResult;

  cloudinary.uploader.upload("uploads/" + file.filename, (err, result) => {
    console.log(err, result);

    if (!err) {
      employeePic.picUrl = result.secure_url;
      apiResult = result;
      employeePic.email = req.body.email;
      employeePic.save();

      fs.unlink(`uploads/${file.filename}`, (err) => {
        if (err) {
          console.log(`Deleting File Error: ${err.message}`);
        }
      });

      return result;
    }
  });

  // res.status(200).send(apiResult);
});

module.exports = router;
