const {searchProducts} = require("../../models/mysql_queries")
function reviewController() {
    return{
        async index(req,res){
            res.redirect('/');
            
        }
    }
}
module.exports = reviewController;