const mysql_conn = require('../../mysql_conn');
const util = require("util");
const query = util.promisify(mysql_conn.query).bind(mysql_conn);

async function getCategorizedProducts(category){
    const categoryProductsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id \
    WHERE category = ?";

    return await query(categoryProductsQuery, [category]);
}

module.exports.getCategorizedProducts = getCategorizedProducts;