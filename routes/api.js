const e = require("express");
const express = require("express");
const { route } = require("express/lib/application");
const res = require("express/lib/response");
const { send } = require("express/lib/response");
const {getProducts, getCategorizedProducts, isCustomer, getCustomer, getCategories, addCustomer, getCart, addToCart, addToCartDuplicate, setName, setEmail, setPassword, setPhoneNo, setAddressStreetNo, setAddressStreetName, setAddressPostalCode, setAddressCountry, setAddressCity, isSupplier, getSupplier, updateProductStock, getSupplyRequests, addSupplierCategory, updateSupplyRequest} = require("../app/models/mysql_queries")
const router = express.Router();

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
router.put("/products", async(req, res)=>{
    const {username, password, productid, stock} = req.query
    if(!username || !password || !productid || !stock){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isSupplier(username)){
        const account = await getSupplier(username);
        if(account[0].password == password){
            await updateProductStock(productid, stock);
            res.status(200).json({
                "status_code": 200,
                "status_message": "Sucessfully updated product stock"
            })
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

router.get("/categories", async(req,res) => {
    const categories = await getCategories();
    res.send(categories);
})

router.get("/user/", async(req,res) => {
    const {username, password, supplier} = req.query;
    if(!username || !password){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(parseInt(supplier)){
        if(await isSupplier(username)){
            const account = await getCustomer(username);
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
router.post("/user", async(req,res) => {
    const {name, email, username, password} = req.query;
    if(!name || !email || !username || !password){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    await addCustomer(name, email, username, password)
    // check if user already exists
    res.status(200).json({
        "status_code" : 200,
        "status_message": "Successfully Added account"
    })
    
})
router.put('/user', async(req, res) => {
    const {username, password, field, value} = req.query;
    if(!username || !password || !field || !value){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isCustomer(username)){
        const account = await getCustomer(username);
        if(account[0].password == password){
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
                    "status_message": `Successfully edited ${value}`
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
router.get("/cart/", async(req,res) => {
    const {username, password} = req.query;
    if(!username || !password){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isCustomer(username)){
        const account = await getCustomer(username);
        if(account[0].password == password){
            const cart = await getCart(username)
            res.send(cart)
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
router.post("/cart/", async(req,res) => {
    const {username, password, productid} = req.query;
    if(!username || !password || !parseInt(productid)){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isCustomer(username)){
        const account = await getCustomer(username);
        if(account[0].password == password){
            await addToCartDuplicate(username, parseInt(productid));
            res.status(200).json({
                "status_code" : 200,
                "status_message": "Successfully Added item to Cart"
            })
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

router.get("/supplier", async(req, res) => {
    const {username, password} = req.query
    if(!username || !password){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isSupplier(username)){
        const account = await getSupplier(username);
        if(account[0].password == password){
            const foundRequests = await getSupplyRequests(username);
            res.send(foundRequests);
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
router.put("/supplier", async(req,res) => {
    const {username, password, reqid} = req.query
    if(!username || !password || !parseInt(reqid)){
        res.status(400).json({
            "status_code": 400,
            "status_message": "Invalid values"
        })
        return;
    }
    if(await isSupplier(username)){
        const account = await getSupplier(username);
        if(account[0].password == password){
            await updateSupplyRequest(parseInt(reqid))
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
module.exports = router;