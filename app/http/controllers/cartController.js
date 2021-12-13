function cartController() {
    return {
        index(req, res) {
            res.render('cart')
        },
        update(req, res) {
            
            if(!req.session.cart) {
                req.session.cart = {
                    items: {},
                    quantityT: 0,
                    priceT: 0
                }
            }

            req.session.cart.quantityT++;
            console.log(req.body);
            return res.json({ quantityT: req.session.cart.quantityT });
        }
    }
}

module.exports = cartController