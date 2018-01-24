const Product = require("./Product");

Product.create([
  {
    name: "Estamico",
    price: "10",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    productImage: "./foo",
  },
  {
    name: "Misaky",
    price: "12",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    productImage: "./foo",
  },
  {
    name: "Eyetribe",
    price: "14",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    productImage: "./foo",
  },
  {
    name: "Eyetribe",
    price: "14",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    productImage: "./foo",
  },
  {
    name: "Eyetribe",
    price: "14",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    productImage: "./foo",
  },
  {
    name: "Eyetribe",
    price: "14",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    productImage: "./foo",
  },
  {
    name: "Eyetribe",
    price: "14",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    productImage: "./foo",
  },
  {
    name: "Eyetribe",
    price: "14",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    productImage: "./foo",
  },
  {
    name: "Eyetribe",
    price: "14",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    productImage: "./foo",
  },
])
  .then(products => {
    console.log("Created products", products);
  })
  .catch(error => {
    console.error(error);
  });
