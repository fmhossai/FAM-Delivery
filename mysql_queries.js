const mysql_conn = require('./mysql_conn');

const productsQuery = "SELECT pName, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id";

const frozenProductsQuery = "SELECT pName, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id \
    WHERE category = 'Frozen'";


// test purposes only
// mysql_conn.query(productsQuery, function (err, result, fields) {
//   if(err) throw err;
//   console.log(result[1].pName);
// });