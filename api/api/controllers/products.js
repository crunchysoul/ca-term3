const mongoose = require("mongoose");
const Product = require("../models/Product.js");

productsGetAll = (req, res, next) => {
  Product.find()
    // For pagination purpose
    // Product.find().limit()

    .select("name price productImage description")
    .then(products => {
      const response = {
        count: products.length,
        products: products.map(product => {
          const request = {
            type: "GET",
            url: `http://localhost:7000/products/${product.id}`,
          };
          return {
            name: product.name,
            price: product.price,
            description: product.description,
            productImage: product.productImage,
            _id: product._id,
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

productsCreate = (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });

  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          productImage: result.productImage,
          _id: result._id,
          request: {
            type: "POST",
            url: `http://localhost:7000/products/${result.id}`,
          },
        },
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

productsGet = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price productImage")
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: `GET product by ID: ${doc.id}`,
            url: `http://localhost:7000/products/${doc.id}`,
          },
        });
      } else {
        res.status(404).json({
          message: `No valid entry found for provided Id: ${id}`,
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

productsUpdate = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({_id: id}, {$set: updateOps})
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: `product with ID ${id} successfully updated`,
        request: {
          type: "PATCH",
          url: `http://localhost:7000/products/${id}`,
        },
      });
    })
    .catch(error => {
      res.statu(500).json({
        error,
      });
    });
};

productsDelete = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({_id: id})
    .then(result => {
      res.status(200).json({
        message: "Product deleted successfully",
        request: {
          foo: "foo",
        },
      });
    })
    .catch(error => {
      res.status(500).json({error});
    });
};

module.exports = {
  productsGetAll,
  productsCreate,
  productsGet,
  productsUpdate,
  productsDelete,
};
