
const express = require("express");
const { route } = require("express/lib/application");
const res = require("express/lib/response");
const { send } = require("express/lib/response");
const {getProducts, getCategorizedProducts, isCustomer, getCustomer, getCategories, addCustomer, getCart, addToCart, addToCartDuplicate, setName, setEmail, setPassword, setPhoneNo, setAddressStreetNo, setAddressStreetName, setAddressPostalCode, setAddressCountry, setAddressCity, isSupplier, getSupplier, updateProductStock, getSupplyRequests, addSupplierCategory, updateSupplyRequest, getReviews, addReview, removeCartItem, decreaseProductStock, removeFromCartDuplicate, getRating, getProduct} = require("../app/models/mysql_queries")
const router = express.Router();
const auth = require("express-basic-auth")

// use express baseic auth
router.use(auth({
    users:{
        "admin" : process.env.ADMIN_PASSWORD
    },
    unauthorizedResponse: unAuthResponse
}))

function unAuthResponse(req) {
   if(req.auth){
       return {
           "message" : "incorrect username and password"
       }
   }
   else{
       return {
           "message": "no credentials input"
       }
   }
}

// user sign up
router.post("/user", async(req,res) => {
    const {name, email, username, password} = req.query;
    if(!name || !email || !username || !password){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    await addCustomer(name, username, email, password)
    // check if user already exists
    res.status(200).json({
        "status_code" : 200,
        "status_message": "Successfully Added account"
    })
})

// user login
router.get("/user/", async(req,res) => {
    const {username, password, supplier} = req.query;
    if(!username || !password){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(parseInt(supplier) === 1){
        if(await isSupplier(username)){
            const account = await getSupplier(username);
            if(account[0].password == password){
                res.status(200).json({
                    "status_code": 200,
                    "status_message": "Valid Supplier account"
                })
                return;
            }
            else{
                res.status(400).json({
                    "status_code": 400,
                    "status_message": "Invalid Password"
                })
                return;
            }
        } 
        else{
            res.status(400).json({
                "status_code": 400,
                "status_message": "Invalid Username"
            })
            return;
        }
    }
    if(await isCustomer(username)){
        const account = await getCustomer(username);
        if(account[0].password == password){
            res.status(200).json({
                "status_code": 200,
                "status_message": "Valid account"
            })
            return;
        }
        else{
            res.status(400).json({
                "status_code": 400,
                "status_message": "Invalid Password"
            })
            return;
        }
    } 
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }
})

router.get("/profile/", async(req, res) => {
    const {username} = req.query;
    if(!username){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isCustomer(username)){
        const profile = await getCustomer(username)
        res.send(profile)
    }
    else if(await isSupplier(username)){
        const profile = await getSupplier(username)
        res.send(profile)
    } 
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }
})

router.put('/profile', async(req, res) => {
    const {username, field, value} = req.query;
    if(!username || !field || !value){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if((await isCustomer(username)) || isSupplier(username)){
        if(value == ""){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Empty value"
        })
        return;
        }
        if(field == ""){
            res.status(400).json({
                "status_code": 400,
                "status_message": "empty field value"
            })
            return;
        }
        if(field.toLowerCase() == "name") await setName(username, value)
        if(field.toLowerCase() == "email") await setEmail(username, value)
        if(field.toLowerCase() == "password") await setPassword(username, value)
        if(field.toLowerCase() == "phoneno") await setPhoneNo(username, value)
        if(field.toLowerCase() == "streetno") await setAddressStreetNo(username, parseInt(value)) // check if its decimal
        if(field.toLowerCase() == "streetname") await setAddressStreetName(username, value)
        if(field.toLowerCase() == "postalcode") await setAddressPostalCode(username, value)
        if(field.toLowerCase() == "country") await setAddressCountry(username, value)
        if(field.toLowerCase() == "city") await setAddressCity(username, value)
        res.status(200).json({
            "status_code" : 200,
            "status_message": `Successfully edited ${field}`
        })
        return;
    } 
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }
})

// get products from users cart
router.get("/cart/", async(req,res) => {
    const {username} = req.query;
    if(!username ){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isCustomer(username)){
        const cart = await getCart(username)
        res.send(cart)
    } 
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }

})

// add product to user's cart
router.post("/cart/", async(req,res) => {
    const {username, productid} = req.query;
    if(!username || !parseInt(productid)){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isCustomer(username)){
        if(parseInt(req.query.qty)){
            await addToCart(username, parseInt(productid), parseInt(req.query.qty))
        }
        else{
            await addToCartDuplicate(username, parseInt(productid));
        }
        res.status(200).json({
            "status_code" : 200,
            "status_message": "Successfully Added item to Cart"
        })
    } 
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }
})

// remove product from user's cart
router.delete("/cart/", async(req, res) => {
    const {username, product_id } = req.query
    if(!username || !parseInt(product_id)){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isCustomer(username)){
        try{
            if(parseInt(req.query.incart) === 1){
                await removeFromCartDuplicate(username,product_id)
            }
            else{
                await removeCartItem(username, product_id)
            }
        }
        catch(error){
            console.log(error)
            res.status(200).json({
                "status_code" : 200,
                "status_message": "An Error has occured when deleting this item from the cart"
            })
        }
        
        res.status(200).json({
            "status_code" : 200,
            "status_message": "Successfully Removed item to Cart"
        })
    } 
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }
})

// get all products or categorized products
router.get("/products", async(req,res) => {
    const query = req.query
    if(Object.keys(query).length > 0){
        if(req.query.category == ""){
            res.status(400).json({
                error: "Bad Request"
            })
            return;
        }
        const productData = await getCategorizedProducts(query.category)
        res.send(productData);
    }
    else{
        const productData = await getProducts();
        res.send(productData);
    }
})

// update products
router.put("/products", async(req, res)=>{
    const {username, productid, stock} = req.query
    if(!username || !productid || !stock){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isSupplier(username)){
        await updateProductStock(productid, stock);
        res.status(200).json({
            "status_code": 200,
            "status_message": "Sucessfully updated product stock"
        })
    } 
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }
})

// delete products
router.delete("/products", async(req, res) => {
    const {product_id, amount} = req.query;
    if(!parseInt(product_id) || !parseInt(amount)){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    await decreaseProductStock(product_id, amount)
    res.status(200).json({
        "status_code": 200,
        "status_message": "Sucessfully deleted product stock"
    })
})

// get categories
router.get("/categories", async(req,res) => {
    const categories = await getCategories();
    res.send(categories);
})

// supplier login
router.get("/supplier", async(req, res) => {
    const {username} = req.query
    if(!username){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isSupplier(username)){
        const foundRequests = await getSupplyRequests(username);
        res.send(foundRequests);

    } 
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }
})

// supplier requests
router.put("/supplier", async(req,res) => {
    const {username, reqid} = req.query
    if(!username || !parseInt(reqid)){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isSupplier(username)){
        await updateSupplyRequest(parseInt(reqid))
        res.status(200).json({
            "status_code" : 200,
            "status_message": "Successfully Updated supplier request"
        })
    } 
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }
})

// review validation
router.get("/reviews", async(req, res) => {
    const {product_id} = req.query;
    if(!product_id){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    const reviews = await getReviews(product_id)
    res.send(reviews)
})

// save product ratings
router.post("/reviews", async(req, res) => {
    const {username, product_id, rating, description} = req.query;
    if(!parseInt(product_id) || !username || !parseInt(rating || !description)){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isCustomer(username)){
        await addReview(username, product_id, rating, description)
        res.status(200).json({
            "status_code" : 200,
            "status_message": "Successfully Added review"
        })
    }
    else{
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid Username"
        })
        return;
    }
    
})

// get product ratings
router.get("/rating", async(req, res) => {
    const {product_id} = req.query;
    if(!parseInt(product_id)){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    const ratings = await getRating(product_id);
    const productInfo = await getProduct(product_id)
    res.send({
        product_name: productInfo[0].pname,
        product_info: productInfo[0].category,
        rating: ratings
    });

})
module.exports = router;