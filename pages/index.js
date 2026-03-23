const LoginPage = require('./LoginPage');
const ProductsPage = require('./ProductsPage');
const CartPage = require('./CartPage');

function createPages(page) {
  return {
    loginPage: new LoginPage(page),
    productsPage: new ProductsPage(page),
    cartPage: new CartPage(page),
  };
}

module.exports = { LoginPage, ProductsPage, CartPage, createPages };
