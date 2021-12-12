// const mysql_conn = require('../../mysql_conn');

// const productsQuery = "SELECT pname, price, category, description, name AS supplier_name, stock, image_link \
//     FROM product INNER JOIN account ON product.supplier_id = account.id";

// var data = [];

// mysql_conn.query(productsQuery, function (err, result, fields) {
//     if(err) throw err;
//     console.log(result[1].pname);
//     data = result;
// });

const data = [
    {
        "product_name" : "Banana",
        "product_price" : 12.34,
        "product_category": "Fruits",
        "product_description" : "A yellow fruit",
        "product_supplier" : "Fruit Company",
        "product_stock" : 14,
        "product_image_url": "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
    },
    {
        "product_name" : "Strawberry",
        "product_price" : 3.00,
        "product_category": "Fruits",
        "product_description" : "A Red fruit",
        "product_supplier" : "Fruit Company",
        "product_stock" : 4,
        "product_image_url": "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    },
    {
        "product_name" : "Blueberry",
        "product_price" : 1.00,
        "product_category": "Fruits",
        "product_description" : "A blue fruit",
        "product_supplier" : "Fruit Company",
        "product_stock" : 1,
        "product_image_url": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
    },
    {
        "product_name" : "Watermelon",
        "product_price" : 5.00,
        "product_category": "Fruits",
        "product_description" : "A sphere fruit",
        "product_supplier" : "Fruit Company",
        "product_stock" : 4,
        "product_image_url": "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
        "product_name" : "Broccoli",
        "product_price" : 2.00,
        "product_category": "Veggies",
        "product_description" : "A very yummy food",
        "product_supplier" : "Veggie Company",
        "product_stock" : 5,
        "product_image_url": "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
        "product_name" : "Califlower",
        "product_price" : 5.00,
        "product_category": "Veggies",
        "product_description" : "Similar to Broccoli",
        "product_supplier" : "Veggie Company",
        "product_stock" : 5,
        "product_image_url": "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
        "product_name" : "Carrot",
        "product_price" : 1.00,
        "product_category": "Veggies",
        "product_description" : "An Orange vegetable",
        "product_supplier" : "Veggie Company",
        "product_stock" : 4,
        "product_image_url": "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
        "product_name" : "Tomato",
        "product_price" : 1.30,
        "product_category": "Veggies",
        "product_description" : "A red vegetable",
        "product_supplier" : "Veggie Company",
        "product_stock" : 2,
        "product_image_url": "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    }
]


module.exports = data;