const mysql_conn = require('../../mysql_conn');
const util = require('util');
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
async function addToCart(username, productId) {
    const cartQuery = "INSERT INTO cart (customer_id, product_id, qty) VALUES (?, ?, 1) \
    ON DUPLICATE KEY UPDATE qty = qty + 1";

    let accountId = await getAccountId(username);

    await query(cartQuery, [accountId[0].id, productId]);
    return true;
}



async function display() {
    // console.log(await getProducts());
    // console.log(await searchProducts("s"));
    // console.log(await getCategorizedProducts("Bakery"));
    // console.log(await getCategories());
    // console.log(await getCart("demoCustomer"));
    // console.log(await usernameExists("demoCustomer"));
    // console.log(await getAccountId("demoCustomer"));
    // await addToCart("demoCustomer", 2);
}

display();

module.exports.getProducts = getProducts;
module.exports.searchProducts = searchProducts;
module.exports.getCategorizedProducts = getCategorizedProducts;
module.exports.getCategories = getCategories;
module.exports.getCart = getCart;
module.exports.usernameExists = usernameExists;
module.exports.getAccountId = getAccountId;
module.exports.addToCart = addToCart;