const { addToCart, getAccountId, addToCartDuplicate, getProduct, removeFromCartDuplicate} = require('../../models/mysql_queries');
function cartController() {
    return {
        index(req, res) {
            res.render('cart', { loggedIn: req.session.username })
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
                const getProductItem = await getProduct(req.body.product_id)
                if(getProductItem[0].stock == 0){
                    return res.json({ quantityT: -1, quantity: cart.items[req.body.product_id].qty });
                }
                cart.items[req.body.product_id] = {
                    item: req.body,
                    qty: 1
                }
                cart.quantityT = cart.quantityT + 1;
                cart.priceT = cart.priceT + req.body.price
            }else {
                const getProductItem = await getProduct(req.body.product_id)
                if(getProductItem[0].stock < (cart.items[req.body.product_id].qty + 1)){
                    return res.json({ quantityT: -1, quantity: cart.items[req.body.product_id].qty});
                }
                cart.items[req.body.product_id].qty = cart.items[req.body.product_id].qty + 1
                cart.quantityT = cart.quantityT + 1
                cart.priceT = cart.priceT + req.body.price
            }
            if(req.session.username){
                await addToCartDuplicate(req.session.username, parseInt(req.body.product_id));
            }
            return res.json({ quantityT: req.session.cart.quantityT, quantity: cart.items[req.body.product_id].qty });
        },
        async remove(req,res){
            let cart = req.session.cart;
            cart.items[req.body.product_id].qty = cart.items[req.body.product_id].qty - 1
            cart.quantityT = cart.quantityT - 1
            cart.priceT = cart.priceT - req.body.price
            if(req.session.username){
                await removeFromCartDuplicate(req.session.username, parseInt(req.body.product_id));
            }
            return res.json({ quantity: cart.items[req.body.product_id].qty, quantityT: req.session.cart.quantityT});
        }
    }
}

module.exports = cartController