require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const employeeController = require("./controllers/employeeController");
const productCategoryController = require("./controllers/productCategoryController");

var app = express();

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: "*", allowedHeaders: "*", methods: "*" }));
app.use(bodyparser.json());
app.listen(3000, () => {
  console.log("Express server started at port : 3000");
});

app.use("/employee", employeeController);
app.use("/product-category", productCategoryController);
