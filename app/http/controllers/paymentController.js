const { decreaseProductStock, removeCartItem} = require('../../models/mysql_queries');

function paymentController(){
    return{
        async index(req, res){
            console.log("Payment success")
            const itemsInCart = Object.values(req.session.cart.items);
            for(const i of itemsInCart){
                await decreaseProductStock(i.item.product_id, i.qty)
                await removeCartItem(req.session.username, i.item.product_id)
            }
            req.session.cart = ''
            req.session.payment = true;
            res.redirect("/")
        }
    }
}

module.exports = paymentController