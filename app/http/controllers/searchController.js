const {searchProducts} = require("../../models/mysql_queries")
function searchController() {
    return{
        async index(req,res){
            //add error checking here
            const {string} = req.query
            const foundProducts = await searchProducts(string);
            res.render("category",{
                products:foundProducts,
                categoryName: `Search Results for ${string}`
            })
        }
    }
}
module.exports = searchController;