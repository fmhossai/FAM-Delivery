const { decreaseProductStock, removeCartItem, addPaymentInfo, addOrder} = require('../../models/mysql_queries');

function paymentController(){
    return{
        async index(req, res){
            const {card_name, card_number, card_date, card_cvv} = req.body
            await addPaymentInfo(req.session.username, card_name, card_number, card_date, card_cvv)
            const itemsInCart = Object.values(req.session.cart.items);
            let productIds = []
            for(const i of itemsInCart){
                productIds.push({
                    product_id: i.item.product_id,
                    qty: i.qty
                });
            }
            await addOrder(req.session.username, productIds, req.session.cart.priceT)
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