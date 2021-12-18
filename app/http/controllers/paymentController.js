const { decreaseProductStock, removeCartItem} = require('../../models/mysql_queries');

function paymentController(){
    return{
        async index(req, res){
            console.log("Payment success")
            console.log({
                card_name: req.body.card_name,
                card_number: req.body.card_number,
                card_date: req.body.card_number,
                card_cvv: req.body.card_cvv
            })
            const itemsInCart = Object.values(req.session.cart.items);
            let productIds = []
            for(const i of itemsInCart){
                productIds.push({
                    product_id: i.item.product_id,
                    qty: i.qty
                });
            }
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