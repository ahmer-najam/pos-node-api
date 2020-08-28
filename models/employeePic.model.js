const mongoose = require("mongoose");

var employeePicSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  picUrl: {
    type: String,
  },
});

mongoose.model("EmployeePic", employeePicSchema);
