This is a very rough blue print of the api and will most likely be altered and expandd on


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
    {
    "status_code": int,
    "status_message" : string
    }
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
{
    "status_code": int,
    "status_message" : string
}
```

Endpoint 3:

Description: Edit Profile

Method: PUT

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

Endpoint 4:

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
Endpoint 5:

Description: Add Product in user's cart.

URL: http://localhost:3001/api/cart/


Method: POST

Input: 
```json
[
    {
        "product_id" : int,
        "user_id": string
    }
]
```
Output:

```json
{
    "status_code" : int,
    "status_message" : string
}
```

Endpoint 6:

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
    "status_message" : string
}
```

Endpoint 7:

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
Endpoint 8:

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
Endpoint 9:

Description: Get All Categories.

URL: http://localhost:3001/api/category

Method: GET

Output:

```json
[{
    "Category_name": string,
}]
```

Endpoint 10:

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