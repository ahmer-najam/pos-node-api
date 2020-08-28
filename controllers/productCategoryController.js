const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const ProductCategory = mongoose.model("ProductCategory");

router.get("/list", (req, res) => {
  ProductCategory.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving productCategory list :" + err);
    }
  });
});

router.get("/one", (req, res) => {
  ProductCategory.find({ _id: req.body._id }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving productCategory list :" + err);
    }
  });
});

router.post("/", (req, res) => {
  var productCategory = new ProductCategory();
  productCategory.RecDate = req.body.RecDate;
  productCategory.UserId = req.body.UserId;
  productCategory.ProductCategoryName = req.body.ProductCategoryName;
  productCategory.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      console.log("Error during record insertion : " + err);
    }
  });
});

router.put("/", (req, res) => {
  ProductCategory.findOneAndUpdate(
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

module.exports = router;
