const mongoose = require("mongoose");

var productCategorySchema = new mongoose.Schema({
  RecDate: {
    type: String,
  },
  UserId: {
    type: String,
  },
  ProductCategoryName: {
    type: String,
    required: "This field is required.",
  },
});

mongoose.model("ProductCategory", productCategorySchema);
