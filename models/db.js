const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://ahmer:Rocky007__@cluster0.lgz8f.mongodb.net/employees?retryWrites=true&w=majority";
mongoose.connect(
  //"mongodb://localhost:27017/pos-db",
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require("./employee.model");
require("./employeePic.model");
require("./productCategory.model");
