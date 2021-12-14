const mysql_conn = require('../../mysql_conn');
const util = require('util');
const req = require('express/lib/request');
const query = util.promisify(mysql_conn.query).bind(mysql_conn);

async function getProducts() {
    const productsQuery = "SELECT product_id, pname, price, category, description, name AS supplier_name, stock, image_link \
        FROM product INNER JOIN account ON product.supplier_id = account.id";
    
    return await query(productsQuery);
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
async function addToCartDuplicate(username, productId) {
    const cartQuery = "INSERT INTO cart (customer_id, product_id, qty) VALUES (?, ?, 1) \
        ON DUPLICATE KEY UPDATE qty = qty + 1";

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
 * @param {*} username username of supplier
 * @returns 2D array with unfulfilled requests
 */
async function getSupplyRequests(username) {
    const requestQuery = "SELECT request_id, pname, product_id, amount, ordered_date \
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
    const cartQuery = "UPDATE supply_request \
        SET fulfilled_date = now() \
        WHERE request_id = ?";

    await query(cartQuery, [requestId]);
    return true;
}

/**
 * @param {*} productId id of target product
 * @param {*} amount amount used to increase the stock of target product
 * @returns 
 */
async function updateProductStock(productId, amount) {
    const cartQuery = "UPDATE product \
        SET stock = stock + ? \
        WHERE product_id = ?";

    await query(cartQuery, [amount, productId]);
    return true;
}

async function queryTest() {
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
    // await addSupplyRequests(1, 2, 5, 15); // request for Blueberry
    // console.log(getSupplyRequests("fc"));
    // await updateSupplyRequest(1);
    // await updateProductStock(5, 10);
    // let customer = await getCustomer("demoCustomer");
    // console.log(customer[0].password);
}

queryTest();

module.exports.getProducts = getProducts;
module.exports.searchProducts = searchProducts;
module.exports.getCategorizedProducts = getCategorizedProducts;
module.exports.getCategories = getCategories;
module.exports.getCart = getCart;
module.exports.usernameExists = usernameExists;
module.exports.getAccountId = getAccountId;
module.exports.addToCart = addToCart;
module.exports.addToCartDuplicate = addToCartDuplicate;
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
module.exports.addSupplyRequest = addSupplyRequest;
module.exports.getSupplyRequests = getSupplyRequests;
module.exports.updateSupplyRequest = updateSupplyRequest;
module.exports.updateProductStock = updateProductStock;