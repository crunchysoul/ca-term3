const mongoose = require("mongoose");
const Order = require("../models/Order.js");
const Product = require("../models/Product.js");

ordersGetAll = (req, res, next) => {
  Order.find()
    .select("product quantity")
    .then(orders => {
      const response = {
        count: orders.length,
        orders: orders.map(order => {
          const request = {
            type: "GET",
            url: `http://localhost:7000/orders/${order.id}`,
          };
          return {
            _id: order._id,
            product: order.product,
            // productName: Product.findById(order.product).name,
            quantity: order.quantity,
            request: request,
          };
        }),
      };
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error});
    });
};

ordersCreate = (req, res, next) => {
  Product.findById(req.body.productId)
    // check product exist
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      return order.save();
    })
    .then(result => {
      console.log(result.id);
      res.status(201).json({
        message: "Order Stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "POST",
          url: `http://localhost:7000/orders/${result.id}`,
        },
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

ordersGet = (req, res, next) => {
  Order.findById(req.params.orderId)
    .select("product quantity")
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order Not Found",
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: `http://localhost:7000/orders/${order.id}`,
        },
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      });
    });
};

ordersDelete = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({_id: id})
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "DELETE",
          url: `http://localhost:7000/orders/`,
          body: {product: "ID", quantity: "Number"},
        },
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      });
    });
};

ordersUpdate = (req, res, next) => {
  res.status(200).json({
    message: "Updated order",
    orderId: req.params.orderId,
  });
};

module.exports = {
  ordersGetAll,
  ordersCreate,
  ordersGet,
  ordersDelete,
  ordersUpdate,
};
