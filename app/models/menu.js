const mysql_conn = require('../../mysql_conn');
const util = require("util");
const query = util.promisify(mysql_conn.query).bind(mysql_conn);
// Construct Schema

async function getData(){
    const productsQuery = "SELECT product_id, pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id";

    return await query(productsQuery);
}

module.exports.getData = getData;


