const express = require("express")
const router = express.Router();

const data = [
    {
        "product_name" : "banana",
        "product_price" : 12.34,
        "product_category": "Fruit",
        "product_description" : "A yellow fruit",
        "product_supplier" : "Fruit Company",
        "product_stock" : 14,
        "product_image_url": "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
    },
    {
        "product_name" : "strawberry",
        "product_price" : 3.00,
        "product_category": "Fruit",
        "product_description" : "A Red fruit",
        "product_supplier" : "Fruit Company",
        "product_stock" : 4,
        "product_image_url": "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    },
    {
        "product_name" : "blueberry",
        "product_price" : 1.00,
        "product_category": "Fruit",
        "product_description" : "A blue fruit",
        "product_supplier" : "Fruit Company",
        "product_stock" : 1,
        "product_image_url": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
    },
    {
        "product_name" : "watermelon",
        "product_price" : 5.00,
        "product_category": "Fruit",
        "product_description" : "A sphere fruit",
        "product_supplier" : "Fruit Company",
        "product_stock" : 4,
        "product_image_url": "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    }
]

router.get("/", (req,res) => {
    const params = req.query;
    console.log(params);
    res.send(data);
})
module.exports = router;