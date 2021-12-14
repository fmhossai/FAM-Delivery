const { addToCart, getAccountId, addToCartDuplicate} = require('../../models/mysql_queries');
function cartController() {
    return {
        index(req, res) {
            res.render('cart')
        },
        async update(req, res) {
            
            if(!req.session.cart) {
                req.session.cart = {
                    items: {},
                    quantityT: 0,
                    priceT: 0
                }
            }

            let cart = req.session.cart;
            if(!cart.items[req.body.product_id]){
                cart.items[req.body.product_id] = {
                    item: req.body,
                    qty: 1
                }
                cart.quantityT = cart.quantityT + 1;
                cart.priceT = cart.priceT + req.body.price
            }else {
                cart.items[req.body.product_id].qty = cart.items[req.body.product_id].qty + 1
                cart.quantityT = cart.quantityT + 1
                cart.priceT = cart.priceT + req.body.price
            }
            if(req.session.username){
                await addToCartDuplicate(req.session.username, parseInt(req.body.product_id));
            }
            return res.json({ quantityT: req.session.cart.quantityT });
        }
    }
}

module.exports = cartController