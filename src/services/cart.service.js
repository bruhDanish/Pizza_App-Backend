const { getCartByUserId } = require("../repository/cart.repo.js");
const NotFoundError = require("../utils/notFoundError.js");

async function getCart(userId) {
    const cart = await getCartByUserId(userId);
    if(!cart) {
        throw new NotFoundError('Cart');
    }
    return cart;
}

module.exports = {
    getCart
}