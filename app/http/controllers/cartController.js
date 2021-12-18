const { addToCart, getAccountId, addToCartDuplicate, getProduct, removeFromCartDuplicate, removeCartItem} = require('../../models/mysql_queries');
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
                    return res.json({ 
                        quantityT: -1, 
                        quantity: cart.items[req.body.product_id].qty, 
                        price: req.body.price*cart.items[req.body.product_id].qty,
                        priceT: cart.priceT
                    });
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
                    return res.json({
                        quantityT: -1, 
                        quantity: cart.items[req.body.product_id].qty, 
                        price: req.body.price*cart.items[req.body.product_id].qty,
                        priceT: cart.priceT
                    });
                }
                cart.items[req.body.product_id].qty = cart.items[req.body.product_id].qty + 1
                cart.quantityT = cart.quantityT + 1
                cart.priceT = cart.priceT + req.body.price
            }
            if(req.session.username){
                await addToCartDuplicate(req.session.username, parseInt(req.body.product_id));
            }
            return res.json({
                quantityT: req.session.cart.quantityT, 
                quantity: cart.items[req.body.product_id].qty, 
                price: cart.items[req.body.product_id].qty * req.body.price,
                priceT: cart.priceT
            });
        },
        async remove(req,res){
            let cart = req.session.cart;
            cart.items[req.body.product_id].qty = cart.items[req.body.product_id].qty - 1
            cart.quantityT = cart.quantityT - 1
            cart.priceT = parseFloat(cart.priceT).toFixed(2);
            cart.priceT = cart.priceT - req.body.price
            if(req.session.username){
                if(cart.items[req.body.product_id].qty == 0) {
                    await removeCartItem(req.session.username, parseInt(req.body.product_id));
                    delete cart.items[req.body.product_id];
                    if(Object.keys(req.session.cart.items).length == 0) {
                        req.session.cart = null;
                    }
                    return res.json({ 
                        quantity: 0, 
                        quantityT: req.session.cart.quantityT, 
                        price: 0,
                        priceT: cart.priceT
                    });
                } else {
                    await removeFromCartDuplicate(req.session.username, parseInt(req.body.product_id));
                }
            }

            if(cart.items[req.body.product_id].qty == 0) {
                delete cart.items[req.body.product_id];
                let quantityTotal = req.session.cart.quantityT;
                if(Object.keys(req.session.cart.items).length == 0) {
                    req.session.cart = null;
                    quantityTotal = ''
                }
                return res.json({ 
                    quantity: 0, 
                    quantityT: quantityTotal, 
                    price: 0,
                    priceT: cart.priceT
                });
            }

            return res.json({ 
                quantity: cart.items[req.body.product_id].qty, 
                quantityT: req.session.cart.quantityT, 
                price: cart.items[req.body.product_id].qty * req.body.price,
                priceT: cart.priceT
            });
        }
    }
}

module.exports = cartController