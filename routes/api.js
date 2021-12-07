const express = require("express")
const productData = require("./api/products")
const router = express.Router();

router.get("/products", (req,res) => {
    const params = req.query;
    res.send(productData);
})
module.exports = router;