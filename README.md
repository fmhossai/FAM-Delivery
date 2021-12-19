# FAM Delivery Application

## Initial Setup:

Create the database in MySQL with the name "fam_delivery" and defined with the tables and values in the `fam.sql` file. Use the following SQL commands to help you setup the database.
```sql
CREATE USER 'fam'@localhost IDENTIFIED BY 'deliveryPass';

GRANT ALL PRIVILEGES ON fam_delivery . * TO 'fam'@'localhost';

ALTER USER 'fam'@'localhost' IDENTIFIED WITH mysql_native_password BY 'deliveryPass';

FLUSH PRIVILEGES;
```

The following are the default values used to connect to the database.

host: `localhost`

username: `fam`

password: `deliveryPass`

You can change these values in the mysql_conn.js to your liking. 

#

## Run the Application:

Ensure that NodeJS and the package manager NPM are installed.

To run this application, change the directory of your terminal of your choice to this folder and the run the following command to install the application dependencies.

```bash
npm install
```

After the dependencies are installed, you can run the application on `localhost:3000` with the following command
```bash
npm run server
```
The application should be running in the web browser with the URL `localhost:3000`

#
## Using the API
The URL for the API is `localhost:3000\api` To use the API, you must have a basic authentication in your header to connect to the API. You can use the following username and password to connect using basic authentication.

Username: `admin`

Password: `secret`

The documentation for the API endpoints can be found using this link.

https://documenter.getpostman.com/view/14136690/UVRAJ7H4

#
## Registered Users

Some already registered users in the database that can be used to test the application account system are

Customer:

username: `demoCustomer`

password: `pw`

\
Supplier:

username: `gg`

password: `pw`

These accounts are just for your convenience. You can also simply create an account using the application.



