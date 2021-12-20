const { addToCartDuplicate, getProduct, removeFromCartDuplicate, removeCartItem} = require('../../models/mysql_queries');

function cartController() {
    return {
        // render the home page with the logged in user
        index(req, res) {
            res.render('cart', { loggedIn: req.session.username })
        },
        // update the cart (add items or increase quantity of present items)
        async update(req, res) {
            if(!req.session.cart) 
                req.session.cart = {
                    items: {},
                    quantityT: 0,
                    priceT: 0
                }
            
            let cart = req.session.cart;
            const getProductItem = await getProduct(req.body.product_id)
            // if not already in cart
            if(!cart.items[req.body.product_id]){
                // if out of stock
                if(getProductItem[0].stock === 0){
                    return res.json({  flagCode: -2 });
                }
                // and in stock then add item to cart in session
                else {
                    cart.items[req.body.product_id] = {
                        item: req.body,
                        qty: 1
                    }
                    cart.quantityT = cart.quantityT + 1;
                    cart.priceT = cart.priceT + req.body.price;
                }
            // if in cart   
            }else {
                // but ordered over available stock (ex: stock=5, addToCart>5)
                if(getProductItem[0].stock < (cart.items[req.body.product_id].qty + 1)){
                    return res.json({ flagCode: -1 });
                }
                // not over, update cart in session, increase quantity by 1 for that item
                else {
                    cart.items[req.body.product_id].qty = cart.items[req.body.product_id].qty + 1
                    cart.quantityT = cart.quantityT + 1
                    cart.priceT = cart.priceT + req.body.price
                }
            }
            // update in DB
            if(req.session.username){ await addToCartDuplicate(req.session.username, parseInt(req.body.product_id)); }
            // return cart
            return res.json({
                quantityT: req.session.cart.quantityT, 
                quantity: cart.items[req.body.product_id].qty, 
                price: cart.items[req.body.product_id].qty * req.body.price,
                priceT: cart.priceT
            });
        },
        // remove items from cart
        async remove(req, res) {
            // decrease totals saved in cart session
            let cart = req.session.cart;
            cart.items[req.body.product_id].qty = cart.items[req.body.product_id].qty - 1
            cart.quantityT = cart.quantityT - 1
            cart.priceT = parseFloat(cart.priceT).toFixed(2) - req.body.price

            // if item does not exist in cart anymore (meaning qty=0)
            if(cart.items[req.body.product_id].qty == 0) {
                // and user is logged in
                if(req.session.username)
                    await removeCartItem(req.session.username, parseInt(req.body.product_id)); //remove item from DB

                delete cart.items[req.body.product_id]; // remove from cart in session

                //if cart is fully empty now (all removed)
                if(Object.keys(req.session.cart.items).length == 0) { req.session.cart = null; }
                // return updated cart
                return res.json({ 
                    quantity: 0, 
                    quantityT: req.session.cart ? req.session.cart.quantityT : '', 
                    price: 0,
                    priceT: req.session.cart ? req.session.cart.priceT : 0
                });
            // if item still exists 
            } else {
                // and user is logged in
                if(req.session.username)
                    await removeFromCartDuplicate(req.session.username, parseInt(req.body.product_id)); //remove -1 from qty in DB
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