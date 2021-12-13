# ************************************************************
# Sequel Ace SQL dump
# Version 3043
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.01 (MySQL 8.0.27)
# Database: fam_delivery
# Generation Time: 2021-12-13 03:24:47 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `address_street_no` int DEFAULT NULL,
  `address_street_name` varchar(255) DEFAULT NULL,
  `address_postal_code` varchar(255) DEFAULT NULL,
  `address_city` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;

INSERT INTO `account` (`id`, `username`, `name`, `email`, `phone_no`, `address_street_no`, `address_street_name`, `address_postal_code`, `address_city`, `address_country`)
VALUES
	(1,'','admin','admin@example.com','(123) 456-7890',NULL,NULL,NULL,NULL,NULL),
	(2,'fc','Fruit Company','',NULL,NULL,NULL,NULL,NULL,NULL),
	(3,'vc','Veggie Company','',NULL,NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `admin_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`admin_id`),
  CONSTRAINT `admin_id` FOREIGN KEY (`admin_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table cart
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `customer_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  PRIMARY KEY (`customer_id`,`product_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `c_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `p_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `supplier_id` int unsigned NOT NULL,
  `category` enum('bakery','veggies','drinks','frozen','fruits','meats','dairy') NOT NULL,
  PRIMARY KEY (`supplier_id`),
  CONSTRAINT `s_id` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `customer_id` int unsigned NOT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `card_name` varchar(255) DEFAULT NULL,
  `card_no` varchar(255) DEFAULT NULL,
  `expiry_date` varchar(255) DEFAULT NULL,
  `cvv` int unsigned DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `id_idx` (`customer_id`),
  CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned NOT NULL,
  `date_of_purchase` timestamp NULL DEFAULT NULL,
  `total` decimal(16,2) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `owner_id_idx` (`customer_id`),
  CONSTRAINT `owner_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table order_contents
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_contents`;

CREATE TABLE `order_contents` (
  `order_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `oc_pid_idx` (`product_id`),
  CONSTRAINT `oc_oid` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `oc_pid` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `product_id` int unsigned NOT NULL AUTO_INCREMENT,
  `pname` varchar(255) NOT NULL,
  `price` decimal(16,2) DEFAULT NULL,
  `category` enum('bakery','veggies','drinks','frozen','fruits','meats','dairy') DEFAULT NULL,
  `description` text,
  `supplier_id` int unsigned DEFAULT NULL,
  `stock` int DEFAULT '0',
  `image_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `supplier_id_idx` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`product_id`, `pname`, `price`, `category`, `description`, `supplier_id`, `stock`, `image_link`)
VALUES
	(1,'Banana',12.34,'fruits','A Yellow Fruit',2,14,'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'),
	(2,'Strawberry',3.00,'fruits','A Red fruit',2,4,'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'),
	(3,'Blueberry',1.00,'fruits','A blue fruit',2,1,'ljnjl'),
	(4,'Watermelon',5.00,'fruits','A sphere fruit',2,4,'ipknjkln'),
	(5,'Broccoli',2.00,'veggies','A very yummy food',3,5,'nklnkln'),
	(6,'Califlower',5.00,'veggies','Similar to Broccoli',3,5,'lknklnkln'),
	(7,'Carrot',1.00,'veggies','An orange vegetable',3,4,'lnjlnln'),
	(8,'Tomato',1.30,'veggies','A red vegetable',3,2,'inipknni');

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table review
# ------------------------------------------------------------

DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
  `customer_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `rating` int unsigned NOT NULL,
  `description` varchar(516) DEFAULT NULL,
  PRIMARY KEY (`customer_id`,`product_id`),
  KEY `p_id_idx` (`product_id`),
  KEY `reviewed_p_idx` (`product_id`),
  CONSTRAINT `reviewed_p` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `reviewing_c` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table supplier
# ------------------------------------------------------------

DROP TABLE IF EXISTS `supplier`;

CREATE TABLE `supplier` (
  `supplier_id` int unsigned NOT NULL,
  `cat_bakery` tinyint NOT NULL DEFAULT '0',
  `cat_veggies` tinyint NOT NULL DEFAULT '0',
  `cat_drinks` tinyint NOT NULL DEFAULT '0',
  `cat_frozen` tinyint NOT NULL DEFAULT '0',
  `cat_fruits` tinyint NOT NULL DEFAULT '0',
  `cat_meats` tinyint NOT NULL DEFAULT '0',
  `cat_dairy` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`supplier_id`),
  CONSTRAINT `supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table supply_request
# ------------------------------------------------------------

DROP TABLE IF EXISTS `supply_request`;

CREATE TABLE `supply_request` (
  `request_id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned NOT NULL,
  `supplier_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `amount` int unsigned NOT NULL,
  `ordered_date` varchar(45) DEFAULT NULL,
  `fulfilled_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `sr_aid_idx` (`admin_id`),
  KEY `sr_sid_idx` (`supplier_id`),
  KEY `sr_pid_idx` (`product_id`),
  CONSTRAINT `sr_aid` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  CONSTRAINT `sr_pid` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `sr_sid` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
