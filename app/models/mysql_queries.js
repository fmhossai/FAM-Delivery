const mysql_conn = require('../../mysql_conn');
const util = require('util');
const req = require('express/lib/request');
const query = util.promisify(mysql_conn.query).bind(mysql_conn);

async function getProducts() {
    const productsQuery = "SELECT product_id, pname, price, category, description, name AS supplier_name, stock, image_link \
        FROM product INNER JOIN account ON product.supplier_id = account.id";
    
    return await query(productsQuery);
}
async function getProduct(product_id) {
    const productsQuery = "SELECT product_id, pname, price, category, description, name AS supplier_name, stock, image_link \
        FROM product INNER JOIN account ON product.supplier_id = account.id WHERE product_id = ?";
    
    return await query(productsQuery, [product_id]);
}

async function searchProducts(search) {
    const searchQuery = "SELECT product_id, pname, price, category, description, name AS supplier_name, stock, image_link \
        FROM product INNER JOIN account ON product.supplier_id = account.id \
        WHERE pname LIKE ?";
    
    return await query(searchQuery, "%" + [search] + "%");
}

async function getCategorizedProducts(catName) {
    const categorizedProductsQuery = "SELECT product_id, pname, price, category, description, name AS supplier_name, stock, image_link \
        FROM product INNER JOIN account ON product.supplier_id = account.id \
        WHERE category = ?";
    
    return await query(categorizedProductsQuery, [catName]);
}

async function getCategories() {
    const categoriesQuery = "SELECT DISTINCT category \
        FROM supplier_category";
    
    return await query(categoriesQuery);
}

async function getCart(username) {
    const cartQuery = "SELECT product_id, pname, price, category, qty, image_link \
        FROM customer JOIN account ON customer_id = id NATURAL JOIN cart NATURAL JOIN product \
        WHERE username = ?";

    return await query(cartQuery, [username]);
}

// exists queries to check if an account with a certain username already exists
async function usernameExists(username) {
    const userQuery = "SELECT 1 \
        FROM account \
        WHERE username = ?";

    let res = await query(userQuery, [username]);
    return (res.length) ? true : false;
}

/**
 * @param {*} username username of target account
 * @returns true if the username belongs to a customer account
 */
async function isCustomer(username) {
    const userQuery = "SELECT 1 \
        FROM account INNER JOIN customer ON id = customer_id \
        WHERE username = ?";

    let res = await query(userQuery, [username]);
    return (res.length) ? true : false;
}

/**
 * @param {*} username username of target account
 * @returns true if the username belongs to a supplier account
 */
 async function isSupplier(username) {
    const userQuery = "SELECT 1 \
        FROM account INNER JOIN supplier ON id = supplier_id \
        WHERE username = ?";

    let res = await query(userQuery, [username]);
    return (res.length) ? true : false;
}

/**
 * @param {*} username username of target account
 * @returns true if the username belongs to an admin account
 */
 async function isAdmin(username) {
    const userQuery = "SELECT 1 \
        FROM account INNER JOIN admin ON id = admin_id \
        WHERE username = ?";

    let res = await query(userQuery, [username]);
    return (res.length) ? true : false;
}

/**
 * @param {*} username 
 * @returns account id with the corresponding username
 */
async function getAccountId(username) {
    const userQuery = "SELECT id \
        FROM account \
        WHERE username = ?";
    
    return await query(userQuery, [username]);
}

/**
 * if the product is already in the cart qty will be increased by 1
 * @param {*} username username of the cart holder
 * @param {*} productId product id of item to be added to the cart
 * @returns 
 */
async function addToCart(username, productId, qty) {
    // const cartQuery = "INSERT INTO cart (customer_id, product_id, qty) VALUES (?, ?, 1) \
    //     ON DUPLICATE KEY UPDATE qty = qty + 1";
    const cartQuery = "INSERT INTO cart (customer_id, product_id, qty) VALUES (?, ?, ?)";

    let accountId = await getAccountId(username);

    await query(cartQuery, [accountId[0].id, productId, qty]);
    return true;
}

/**
 * @param {*} username username of customer's cart
 * @param {*} productId target product of removal
 * @returns 
 */
 async function removeCartItem(username, productId) {
    const cartQuery = "DELETE FROM cart \
        WHERE customer_id = ? AND product_id = ?"

    let accountId = await getAccountId(username);

    await query(cartQuery, [accountId[0].id, productId]);
    return true;
}

async function addToCartDuplicate(username, productId) {
    const cartQuery = "INSERT INTO cart (customer_id, product_id, qty) VALUES (?, ?, 1) \
        ON DUPLICATE KEY UPDATE qty = qty + 1";

    let accountId = await getAccountId(username);

    await query(cartQuery, [accountId[0].id, productId]);
    return true;
}

async function removeFromCartDuplicate(username, productId) {
    const cartQuery = "UPDATE cart \
    SET qty = qty - 1 \
    WHERE customer_id = ? AND product_id = ?";
    
    let accountId = await getAccountId(username);

    await query(cartQuery, [accountId[0].id, productId]);
    return true;
}

/**
 * @param {*} name account name
 * @param {*} username account username - must be unique
 * @param {*} email account email
 * @param {*} password account password
 * @returns id of account
 */
async function addAccount(name, username, email, password) {
    const userQuery = "INSERT INTO account (name, username, email, password) VALUES (?,?,?,?)";

    await query(userQuery, [name, username, email, password]);
    return await getAccountId(username);
}

/**
 * @param {*} name customer name
 * @param {*} username customer username - must be unique
 * @param {*} email customer email
 * @param {*} password customer password
 * @returns
 */
async function addCustomer(name, username, email, password) {
    const userQuery = "INSERT INTO customer (customer_id) VALUES (?)";

    let accountId = await addAccount(name, username, email, password);

    await query(userQuery, [accountId[0].id]);
    return true;
}

/**
 * @param {*} name supplier name
 * @param {*} username supplier username - must be unique
 * @param {*} email supplier email
 * @param {*} password supplier password
 * @returns
 */
async function addSupplier(name, username, email, password) {
    const userQuery = "INSERT INTO supplier (supplier_id) VALUES (?)";

    let accountId = await addAccount(name, username, email, password);

    await query(userQuery, [accountId[0].id]);
    return true;
}

// add/remove categories of supplier
async function addSupplierCategory(username, category) {
    const categoryQuery = "INSERT INTO category (supplier_id, category) VALUES (?,?)";

    let accountId = await getAccountId(username);

    await query(categoryQuery, [accountId[0].id, category]);
    return true;
}

async function removeSupplierCategory(username, category) {
    const categoryQuery = "DELETE FROM category \
        WHERE supplier_id = ? AND \
        category = ?";

    let accountId = await getAccountId(username);

    await query(categoryQuery, [accountId[0].id, category]);
    return true;
}

// get account for cutomer or supplier
async function getCustomer(username) {
    const userQuery = "SELECT * \
        FROM account INNER JOIN customer ON id = customer_id \
        WHERE username = ?";

    return await query(userQuery, [username]);
}

async function getSupplier(username) {
    const userQuery = "SELECT * \
        FROM account INNER JOIN supplier ON id = supplier_id \
        WHERE username = ?";

    return await query(userQuery, [username]);
}

/**
 * @param {*} username username of target user for change
 * @param {*} name field of change (string)
 * @returns 
 */
async function setName(username, name) {
    const nameQuery = "UPDATE account \
        SET name = ? \
        WHERE username = ?";

    await query(nameQuery, [name, username]);
    return true;
}

/**
 * @param {*} username username of target user for change
 * @param {*} email field of change (string)
 * @returns 
 */
async function setEmail(username, email) {
    const emailQuery = "UPDATE account \
        SET email = ? \
        WHERE username = ?";

    await query(emailQuery, [email, username]);
    return true;
}

/**
 * @param {*} username username of target user for change
 * @param {*} password field of change (string)
 * @returns 
 */
async function setPassword(username, password) {
    const passwordQuery = "UPDATE account \
        SET password = ? \
        WHERE username = ?";

    await query(passwordQuery, [password, username]);
    return true;
}

/**
 * @param {*} username username of target user for change
 * @param {*} phoneNo field of change (string)
 * @returns 
 */
async function setPhoneNo(username, phoneNo) {
    const phoneQuery = "UPDATE account \
        SET phone_no = ? \
        WHERE username = ?";

    await query(phoneQuery, [phoneNo, username]);
    return true;
}

/**
 * @param {*} username username of target user for change
 * @param {*} streetNo field of change (+ve int)
 * @param {*} streetName field of change (string)
 * @param {*} postalCode field of change (string)
 * @param {*} city field of change (string)
 * @param {*} country field of change (string)
 * @returns 
 */
async function setAddress(username, streetNo, streetName, postalCode, city, country) {
    const addressQuery = "UPDATE account \
        SET address_street_no = ?, \
            address_street_name = ?, \
            address_postal_code = ?, \
            address_city = ?, \
            address_country = ? \
        WHERE username = ?";

    await query(addressQuery, [streetNo, streetName, postalCode, city, country, username]);
    return true;
}

/**
 * @param {*} username username of target user for change
 * @param {*} streetNo field of change (+ve int)
 * @returns 
 */
async function setAddressStreetNo(username, streetNo) {
    const addressQuery = "UPDATE account \
        SET address_street_no = ? \
        WHERE username = ?";

    await query(addressQuery, [streetNo, username]);
    return true;
}

/**
 * @param {*} username username of target user for change
 * @param {*} streetName field of change (string)
 * @returns 
 */
async function setAddressStreetName(username, streetName) {
    const addressQuery = "UPDATE account \
        SET address_street_name = ? \
        WHERE username = ?";

    await query(addressQuery, [streetName, username]);
    return true;
}

/**
 * @param {*} username username of target user for change
 * @param {*} postalCode field of change (string)
 * @returns 
 */
async function setAddressPostalCode(username, postalCode) {
    const addressQuery = "UPDATE account \
        SET address_postal_code = ? \
        WHERE username = ?";

    await query(addressQuery, [postalCode, username]);
    return true;
}

/**
 * @param {*} username username of target user for change
 * @param {*} city field of change (string)
 * @returns 
 */
async function setAddressCity(username, city) {
    const addressQuery = "UPDATE account \
        SET address_city = ? \
        WHERE username = ?";

    await query(addressQuery, [city, username]);
    return true;
}

/**
 * @param {*} username username of target user for change
 * @param {*} country field of change (string)
 * @returns 
 */
async function setAddressCountry(username, country) {
    const addressQuery = "UPDATE account \
        SET address_country = ? \
        WHERE username = ?";

    await query(addressQuery, [country, username]);
    return true;
}

/**
 * @param {*} adminId id of admin who made the request
 * @param {*} supplierId id of supplier who the request is for
 * @param {*} productId id of product the request is supplying
 * @param {*} amount quantity of the supply being added
 * @returns 
 */
async function addSupplyRequest(adminId, supplierId, productId, amount) {
    const requestQuery = "INSERT INTO supply_request (admin_id, supplier_id, product_id, amount, ordered_date) VALUES (?,?,?,?,now())";

    await query(requestQuery, [adminId, supplierId, productId, amount]);
    return true;
}

/**
 * @param {*} requestId id of request
 * @returns request
 */
 async function getSupplyRequest(requestId) {
    const requestQuery = "SELECT * \
        FROM supply_request NATURAL JOIN product \
        WHERE request_id = ?";

    return await query(requestQuery, [requestId]);
}

/**
 * @param {*} username username of supplier
 * @returns 2D array with unfulfilled requests
 */
async function getSupplyRequests(username) {
    const requestQuery = "SELECT request_id, pname, category, product_id, amount, ordered_date \
        FROM supply_request NATURAL JOIN product \
        WHERE supplier_id = ? AND fulfilled_date IS NULL";
    
    let accountId = await getAccountId(username);

    return await query(requestQuery, [accountId[0].id]);
}

/**
 * @param {*} requestId id of request to update
 * @returns 
 */
async function updateSupplyRequest(requestId) {
    const supplyQuery = "UPDATE supply_request \
        SET fulfilled_date = now() \
        WHERE request_id = ?";

    // updates stock of product according to supply request
    stockUpdate = await getSupplyRequest(requestId);
    await updateProductStock(stockUpdate[0].product_id, stockUpdate[0].amount);

    await query(supplyQuery, [requestId]);
    return true;
}

/**
 * @param {*} productId id of target product
 * @param {*} amount amount used to increase the stock of target product
 * @returns 
 */
async function updateProductStock(productId, amount) {
    const productQuery = "UPDATE product \
        SET stock = stock + ? \
        WHERE product_id = ?";

    await query(productQuery, [amount, productId]);
    return true;
}

async function decreaseProductStock(productId, amount) {
    const cartQuery = "UPDATE product \
        SET stock = stock - ? \
        WHERE product_id = ?";
    await query(cartQuery, [amount, productId]);
    return true;
}

/**
 * @param {*} productId id of target product
 * @returns all reviews of target product
 */
async function getReviews(productId) {
    const reviewQuery = "SELECT customer_id, username, product_id, pname, rating, description \
        FROM product NATURAL JOIN review INNER JOIN account ON id = customer_id \
        WHERE product_id = ?";
    
    return await query(reviewQuery, [productId]);
}

/**
 * 
 * @param {*} username username of target customer
 * @param {*} productId id of target product
 * @returns specific review by specified cutomer for specified product
 */
async function getReview(username, productId) {
    const reviewQuery = "SELECT customer_id, username, product_id, pname, rating, description \
        FROM product NATURAL JOIN review INNER JOIN account ON id = customer_id \
        WHERE username = ? AND product_id = ?";
    
    return await query(reviewQuery, [username, productId]);
}

/**
 * adds or updates review of a product
 * @param {*} username username of customer giving review
 * @param {*} productId id of product being reviewed
 * @param {*} rating rating given
 * @param {*} description descrition of review
 * @returns 
 */
async function addReview(username, productId, rating, description) {
    const reviewQuery = "INSERT INTO review (customer_id, product_id, rating, description) VALUES (?, ?, ?, ?) \
    ON DUPLICATE KEY UPDATE rating = ?, description = ?";

    let accountId = await getAccountId(username);

    await query(reviewQuery, [accountId[0].id, productId, rating, description, rating, description]);
    return true;
}

/**
 * @param {*} productId id of target product
 * @returns rating
 */
async function getRating(productId) {
    const reviewQuery = "SELECT AVG(rating) AS 'rating' \
        FROM review\
        WHERE product_id = ?";
    
    const r = await query(reviewQuery, [productId]);
    return r[0].rating;
}

async function queryTest() {
    // console.log(await getProduct(1));
    // console.log(await getProducts());
    // console.log(await searchProducts("s"));
    // console.log(await getCategorizedProducts("Bakery"));
    // console.log(await getCategories());
    // console.log(await getCart("demoCustomer"));
    // console.log(await usernameExists("demoCustomer"));
    // console.log(await getAccountId("demoCustomer"));
    // await addToCart("demoCustomer", 2);
    // await setName("demoCustomer", "Bob The Great");
    // await setAddress("demoCustomer", 77, "Awesome Street", "H8V 6G3", "Calgary", "Canada");
    // await addSupplyRequest(1, 2, 22, 13);
    // console.log(getSupplyRequests("fc"));
    // await updateSupplyRequest(1);
    // await updateProductStock(5, 10);
    // let customer = await getCustomer("demoCustomer");
    // console.log(customer[0].password);
    // console.log(await getRating(1));
}

queryTest();

module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.searchProducts = searchProducts;
module.exports.getCategorizedProducts = getCategorizedProducts;
module.exports.getCategories = getCategories;
module.exports.getCart = getCart;
module.exports.usernameExists = usernameExists;
module.exports.isCustomer = isCustomer;
module.exports.isSupplier = isSupplier;
module.exports.isAdmin = isAdmin;
module.exports.getAccountId = getAccountId;
module.exports.addToCart = addToCart;
module.exports.removeCartItem = removeCartItem
module.exports.removeFromCartDuplicate = removeFromCartDuplicate
module.exports.addToCartDuplicate = addToCartDuplicate;
module.exports.removeCartItem = removeCartItem;
module.exports.addAccount = addAccount;
module.exports.addCustomer = addCustomer;
module.exports.addSupplier = addSupplier;
module.exports.addSupplierCategory = addSupplierCategory;
module.exports.removeSupplierCategory = removeSupplierCategory;
module.exports.getCustomer = getCustomer;
module.exports.getSupplier = getSupplier;
module.exports.setName = setName;
module.exports.setEmail = setEmail;
module.exports.setPassword = setPassword;
module.exports.setPhoneNo = setPhoneNo;
module.exports.setAddress = setAddress;
module.exports.setAddressStreetNo = setAddressStreetNo;
module.exports.setAddressStreetName = setAddressStreetName;
module.exports.setAddressPostalCode = setAddressPostalCode;
module.exports.setAddressCity = setAddressCity;
module.exports.setAddressCountry = setAddressCountry;
module.exports.addSupplyRequest = addSupplyRequest;
module.exports.getSupplyRequest = getSupplyRequest;
module.exports.getSupplyRequests = getSupplyRequests;
module.exports.updateSupplyRequest = updateSupplyRequest;
module.exports.updateProductStock = updateProductStock;
module.exports.decreaseProductStock = decreaseProductStock;
module.exports.getReviews = getReviews;
module.exports.getReview = getReview;
module.exports.addReview = addReview;
module.exports.getRating = getRating;