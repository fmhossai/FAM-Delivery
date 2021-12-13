const mysql_conn = require('./mysql_conn');
const util = require('util');
const query = util.promisify(mysql_conn.query).bind(mysql_conn);

async function getProducts() {
    const productsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
        FROM product INNER JOIN account ON product.supplier_id = account.id";
    
    return await query(productsQuery);
}

async function getCategorizedProducts(catName) {
    const categorizedProductsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
        FROM product INNER JOIN account ON product.supplier_id = account.id \
        WHERE category = ?";
    
    return await query(categorizedProductsQuery, [catName]);
}

async function getCart(username) {
    const cartQuery = "SELECT pname, price, category, image_link \
    FROM customer JOIN account ON customer_id = id NATURAL JOIN cart NATURAL JOIN product \
    WHERE username = ?";

    return await query(cartQuery, [username]);
}

// exists queries to check if an account with a certain username already exists
async function usernameExists(username) {
    const cartQuery = "SELECT 1 \
    FROM account \
    WHERE username = ?";
    let res = await query(cartQuery, [username]);
    return (res.length) ? true : false;
}

async function display() {
    // console.log(await getProducts());
    // console.log(await getCategorizedProducts("Bakery"));
    // console.log(await getCart("demoCustomer"));
    console.log(await usernameExists("demoCustomer"));
}

display();

module.exports.getProducts = getProducts;
module.exports.getCategorizedProducts = getCategorizedProducts;
module.exports.getCart = getCart;