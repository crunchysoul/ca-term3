const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const productRoutes = require("./api/routes/products.js");
const orderRoutes = require("./api/routes/orders.js");
const userRoutes = require("./api/routes/users.js");

// Middlewares:

// request logging:

app.use(morgan("dev"));

// make "./uploads/" publically available

app.use("/uploads", express.static("./uploads"));

// body parser:

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// cors:

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// routing:

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

// error handling:

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
