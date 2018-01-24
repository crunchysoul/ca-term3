const mongoose = require("./init");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: false},
  productImage: {type: String, required: false},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
