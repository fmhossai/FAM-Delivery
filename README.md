# FAM-Delivery

##Example from D2L News:

Endpoint 1:
Description: Get user Username.
URL: http://localhost:3001/api/user
Method: Get
Input: ID
Output [{
    "un": string
}]

Endpoint 2:
Description: Get user Password.
URL: http://localhost:3001/api/user
Method: Get
Output: [{
    "pw": string
}]

Endpoint 3:
Description: Set user Information.
URL: https://localhost:3001/api/user
Method: POST
Input: [{
    "FName": string
    "LName": string
    "email": string
    "BDay": date
    "un": string
    "pw": string
    "ReportID": int
}]
Output: ID