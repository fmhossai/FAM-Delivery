const {getCategorizedProducts} = require("../../models/categories")

function categoriesController(){
    return {
        async index(req,res){
            const category = req.params.category;
            const foundProducts = await getCategorizedProducts(category);
            res.render('category', {
                products:foundProducts
            })
        }
    }
}

module.exports = categoriesController