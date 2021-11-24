# FAM-Delivery

##Example from D2L News:

Endpoint 1:

Description: Sign Up User to Database

Method: POST

URL: http://localhost:3001/api/user/


Input:

```json
    {
    "Username": string,
    "Name": string,
    "Email" : string,
    "Password": string
    }
```

Output:

```json
[
    {
    "status_code": int,
    }
]
```

Endpoint 2:

Description: User Login

Method: GET

URL: http://localhost:3001/api/user/


Input:

```json
    {
    "Username": string,
    "Email": string,
    "Password": string
    }
```

Output:

```json
[
    {
    "status_code": int,
    }
]
```
Endpoint 3:

Description: Search Bar in home page

Method: GET

URL: http://localhost:3001/api/products/

Input:

```json
    {
    "query": string,
    }
```

Output:

```json
[
{
    "product_name": string,
    "product_category": string,
    "product_price": float,
    "product_description": string,
    "product_stock": int
}
]
```
Endpoint 4:

Description: Edit Profile

Method: POST

URL: http://localhost:3001/api/profile

Input:

```json
    {
    "Username": string,
    "Name": string,
    "Email" : string,
    "Password": string,
    "Phone_number": string,
    "Address" : string
    }
```

Output:

```json
    {
    "status_code": int,
    "status_message" : string
    }
```

Endpoint 5:

Description: Get Products in user's cart.

URL: http://localhost:3001/api/cart/

Method: GET

Input: 
```json
[
    {
        "user_id" : int
    }
]
```
Output:

```json
[{
    "product_name": string,
    "product_category": string,
    "product_price": float,
    "product_description": string,
    "product_stock": int
}]
```
Endpoint 6:

Description: Add Product in user's cart.

URL: http://localhost:3001/api/cart/


Method: POST

Input: 
```json
[
    {
        "product_id" : int,
        "amount" : int,
        "user_id" : int
    }
]
```
Output:

```json
{
    "status_code" : int,
    "status_status" : string
}
```
Endpoint 7:

Description: Edit Product in user's cart.

URL: http://localhost:3001/api/cart/

Method: PUT

Input: 
```json
[
    {
        "product_id" : int,
        "amount" : int,
        "user_id" : int
    }
]
```
Output:

```json
{
    "status_code" : int,
    "status_status" : string
}
```
Endpoint 8:

Description: Delete Product in user's cart.

URL: http://localhost:3001/api/cart/

Method: DELETE

Input: 
```json
[
    {
        "product_id" : int,
        "user_id" : int
    }
]
```
Output:

```json
{
    "status_code" : int,
    "status_status" : string
}
```
Endpoint 9:

Description: Checkout Payment

URL: http://localhost:3001/api/payment/

Method: POST

Input: 
```json
[
    {
        "user_id" : int,
        "card_number" : int,
        "card_name" : string,
        "expiry_date" : string,
        "CVV" : int
    }
]
```
Output:

```json
{
    "status_code" : int,
    "status_status" : string
}
```
Endpoint 10:

Description: Get All Products.

URL: http://localhost:3001/api/products

Method: GET

Output:

```json
[
{
    "product_name": string,
    "product_category": string,
    "product_price": float,
    "product_description": string,
    "product_stock": int
}
]
```
Endpoint 11:

Description: Get Categorized Products.

URL: http://localhost:3001/api/products

Method: GET

Input:

```json
{
    "category": string
}
```
Output:

```json
[
{
    "product_name": string,
    "product_category": string,
    "product_price": float,
    "product_description": string,
    "product_stock": int
}
]
```
Endpoint 12:

Description: Get All Categories.

URL: http://localhost:3001/api/category

Method: GET

Output:

```json
[{
    "Category_name": string,
}]
```

Endpoint 13:

Description: Get reviews from product.

URL: http://localhost:3001/api/reviews

Method: GET

Input:

```json
[
    {
    "Product_ID": int,
    }
]
```

Output:

```json
[
    {
    "Customer_name": string,
    "Product_ID": int,
    "Product_Name" : string,
    "Rating": int,
    "Description": string
    }
]
```

