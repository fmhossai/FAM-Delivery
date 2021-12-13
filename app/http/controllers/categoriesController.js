const {getCategorizedProducts} = require("../../models/mysql_queries")
function categoriesController(){
    return {
        async index(req,res){
            const category = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1);
            const foundProducts = await getCategorizedProducts(category);
            res.render('category', {
                products:foundProducts,
                categoryName: category
            })
        }
    }
}

module.exports = categoriesController