const { redirect } = require('express/lib/response');
const { addReview } = require('../../models/mysql_queries');

function reviewsController() {
    return {
        async index(req, res) {
            
        },
        async update(req, res) {
            let username = req.session.username;
            let productId = req.body.productId;
            let rating = req.body.selected;
            let description = req.body.description;
            await addReview(username, productId, rating, description);
            return res.json({message:"review added"});
        }
    }
}

module.exports = reviewsController