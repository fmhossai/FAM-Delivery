const express = require("express");
const { send } = require("express/lib/response");
const {getData} = require("./api/products")
const router = express.Router();

router.get("/products", async(req,res) => {
    const params = req.query;
    const productData = await getData();
    res.send(productData);

})
router.get("/products/:category", (req,res) => {
    // const params = req.query;
    let send_products = []
    const category = req.params.category.toLowerCase();
    for(let i = 0; i<productData.length; i++){
        if(productData[i].product_category.toLowerCase() == category){
            send_products.push(productData[i])
        }
    }
    res.send(send_products);
    
})
module.exports = router;