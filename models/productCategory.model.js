const mongoose = require("mongoose");

var productCategorySchema = new mongoose.Schema({
  RecDate: {
    type: String,
    required: "This field is required.",
  },
  UserId: {
    type: String,
    required: "This field is required.",
  },
  ProductCategoryName: {
    type: String,
  },
});

mongoose.model("ProductCategory", productCategorySchema);
