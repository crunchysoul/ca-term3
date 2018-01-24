const express = require("express");
const checkAuth = require("../middleware/check-auth.js");
const upload = require("../middleware/uploader.js");
const productsController = require("../controllers/products.js");

const router = express.Router();

router.get("/", productsController.productsGetAll);
router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productsController.productsCreate,
);
router.get("/:productId", productsController.productsGet);
router.patch("/:productId", checkAuth, productsController.productsUpdate);
router.delete("/:productId", checkAuth, productsController.productsDelete);

module.exports = router;
