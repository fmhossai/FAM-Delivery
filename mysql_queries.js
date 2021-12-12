const mysql_conn = require('./mysql_conn');

const productsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id";

const bakeryProductsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id \
    WHERE category = 'Bakery'";

const veggiesProductsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id \
    WHERE category = 'Veggies'";

const drinksProductsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id \
    WHERE category = 'Drinks'";

const frozenProductsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id \
    WHERE category = 'Frozen'";

const fruitsProductsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id \
    WHERE category = 'Fruits'";

const meatsProductsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id \
    WHERE category = 'Meats'";

const dairyProductsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
    FROM product INNER JOIN account ON product.supplier_id = account.id \
    WHERE category = 'Dairy'";

// products in a certain user's cart name price category image
const cartProducts = "";

// test purposes only
// mysql_conn.query(productsQuery, function (err, result, fields) {
//   if(err) throw err;
//   console.log(result[1].pName);
// });