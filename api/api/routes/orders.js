const express = require("express");
const checkAuth = require("../middleware/check-auth.js");
const OrdersController = require("../controllers/orders.js");

const router = express.Router();

router.get("/", checkAuth, OrdersController.ordersGetAll);
router.post("/", checkAuth, OrdersController.ordersCreate);
router.get("/:orderId", checkAuth, OrdersController.ordersGet);
router.patch("/:orderId", checkAuth, OrdersController.ordersUpdate);
router.delete("/:orderId", checkAuth, OrdersController.ordersDelete);

module.exports = router;
