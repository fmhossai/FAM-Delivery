const bcrypt = require('bcrypt');
const e = require('express');
const { usernameExists, addCustomer, getCustomer, addToCart, getAccountId, getCart, isCustomer, getSupplier } = require('../../models/mysql_queries');

function authController() {
    return {
        login(req, res) {
            res.render('login', {login:false})
        },
        async postLogin(req, res) {
            //sign up
            // console.log(req.session.cart);
            
            if(Object.keys(req.body).length === 4 ){
                const { name, username, email, password } = req.body;
                if(!name || !email || !username || !password){
                    req.flash('errorSignUp', '1 or more invalid fields');
                    req.flash('name', name);
                    req.flash('username', username);
                    req.flash('email', email);
                    return res.render('login', {login:false});
                }

                //check if username is in database
                const exists = await usernameExists(username);
                
                //if it does will display error and redirect to register page again and if not do what is below
                if(exists){
                    req.flash('errorSignUp', 'Username Taken');
                    req.flash('name', name);
                    req.flash('username', username);
                    req.flash('email', email);
                    return res.render('login', {login:false});
                }else {
                    //hash password
                    const hashedPassword = await bcrypt.hash(password, 10);
                    //create a user
                    await addCustomer(name, username, email, password);
                    req.session.username = username
                    if(req.session.cart){
                        const itemsInCart = Object.values(req.session.cart.items);
                        for(const i of itemsInCart){
                            await addToCart(username, i.item.product_id, i.qty)
                        }
                    }
                    //redirect to home page
                    return res.redirect('/');
                }

            //log in
            }else if(Object.keys(req.body).length === 2){
                const { username, password } = req.body;
                if(!username || !password){
                    req.flash('errorLogIn', '1 or more invalid fields');
                    return res.render('login', {login:true});
                } else if(await usernameExists(username)) {
                    let account;
                    if(await isCustomer(username)) {
                        account = await getCustomer(username);

                        if(account[0].password == password) {
                            req.session.username = username
                            const userCart = await getCart(username)
                            if(userCart.length > 0){
                                let itemsCart = {}
                                let qtyT = 0;
                                let priceT = 0;
                                for(let i of userCart){
                                    itemsCart[`${i.product_id}`] = {
                                        item: i,
                                        qty: i.qty
                                    }
                                    qtyT += i.qty
                                    priceT += i.price
                                }
                                req.session.cart = {
                                    items: itemsCart,
                                    quantityT: qtyT,
                                    priceT: priceT
                                }
                            }
                            return res.redirect('/');
                        } else {
                            req.flash('errorLogIn', 'Invalid password');
                            return res.render('login', {login:true});
                        }

                    } else {
                        account = await getSupplier(username);

                        req.session.supplierFlag = true;

                        if(account[0].password == password) {
                            req.session.username = username
                            return res.redirect('/supplier');
                        } else {
                            req.flash('errorLogIn', 'Invalid password');
                            return res.render('login', {login:true});
                        }
                    }
                    
                } else {
                    req.flash('errorLogIn', 'no one by that user exists, try signing up first');
                    return res.render('login', {login:true});
                }
            }
        }
    }
}

module.exports = authController