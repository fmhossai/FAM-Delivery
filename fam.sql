-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fam_delivery
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `address_street_no` int DEFAULT NULL,
  `address_street_name` varchar(255) DEFAULT NULL,
  `address_postal_code` varchar(255) DEFAULT NULL,
  `address_city` varchar(255) DEFAULT NULL,
  `address_country` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'admin123','admin','admin@example.com','pw','(123) 456-7890',NULL,NULL,NULL,NULL,NULL),(2,'gg','General Goods','gg@gmail.com','pw',NULL,NULL,NULL,NULL,NULL,NULL),(3,'vc','Veggie Company','','pw',NULL,NULL,NULL,NULL,NULL,NULL),(4,'demoCustomer','Bob The Great','demo@customer.com','pw','(123) 456-7890',77,'Awesome Street','H8V 6G3','Calgary','Canada'),(5,'demoCustomer2','Matt Murdock','demo2@customer.com','pw',NULL,NULL,NULL,NULL,NULL,NULL),(6,'demoCustomer3','Jacob Williamson','demo3@customer.com','pw',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`admin_id`),
  CONSTRAINT `admin_id` FOREIGN KEY (`admin_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `customer_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `qty` int unsigned DEFAULT '1',
  PRIMARY KEY (`customer_id`,`product_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `c_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `p_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (4,1,12),(4,2,3),(4,3,1),(4,4,1),(5,3,21),(6,1,5),(6,2,1),(6,3,1),(6,4,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (4,'2000-01-01','John Smith','1234 5678 9012 3456','11/24',123),(5,NULL,NULL,NULL,NULL,NULL),(6,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_content`
--

DROP TABLE IF EXISTS `order_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_content` (
  `order_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `p_id_idx` (`product_id`),
  CONSTRAINT `oc_oid` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `oc_pid` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_content`
--

LOCK TABLES `order_content` WRITE;
/*!40000 ALTER TABLE `order_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int unsigned NOT NULL,
  `date_of_purchase` timestamp NULL DEFAULT NULL,
  `total` decimal(16,2) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `owner_id_idx` (`customer_id`),
  CONSTRAINT `order_cid` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int unsigned NOT NULL AUTO_INCREMENT,
  `pname` varchar(255) NOT NULL,
  `price` decimal(16,2) DEFAULT NULL,
  `category` enum('Bakery','Veggies','Drinks','Frozen','Fruits','Meats','Dairy') DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `supplier_id` int unsigned DEFAULT NULL,
  `stock` int DEFAULT '0',
  `image_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `supplier_id_idx` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Ice Cream Cone',3.50,'Frozen','Frozen Goodness',2,7,'https://cdn.pixabay.com/photo/2014/04/04/19/47/ice-313942_1280.png'),(2,'Strawberry Cake',12.30,'Bakery','cake with vanilla and strawberry flavour',2,32,'https://cdn.pixabay.com/photo/2021/06/25/18/14/cake-6364361_1280.png'),(3,'Banana',12.34,'Fruits','A yellow fruit',2,26,'https://cdn.pixabay.com/photo/2014/12/21/23/39/bananas-575773_1280.png'),(4,'Strawberry',3.00,'Fruits','A red fruit',2,7,'https://cdn.pixabay.com/photo/2014/12/22/00/05/strawberry-576772_1280.png'),(5,'Blueberry',1.00,'Fruits','A blue fruit',2,21,'https://cdn.pixabay.com/photo/2014/04/02/16/15/blueberries-306718_1280.png'),(6,'Watermelon',5.00,'Fruits','A spherical fruit',2,20,'https://cdn.pixabay.com/photo/2013/07/12/19/18/watermelon-154510_1280.png'),(7,'Broccoli',2.00,'Veggies','A very yummy food',2,5,'https://cdn.pixabay.com/photo/2020/08/25/19/01/broccoli-5517821_1280.png'),(8,'Cauliflower',5.00,'Veggies','Similar to broccoli',2,6,'https://cdn.pixabay.com/photo/2017/07/24/09/28/cauliflower-2534064_1280.png'),(9,'Carrot',1.00,'Veggies','An orange vegetable',2,4,'https://cdn.pixabay.com/photo/2014/12/21/23/34/carrot-575529_1280.png'),(10,'Tomato',1.30,'Fruits','A red vegetable',2,2,'https://cdn.pixabay.com/photo/2017/01/31/21/56/food-2027563_1280.png'),(11,'Cabbage',2.00,'Veggies','Green ball of grass',2,8,'https://cdn.pixabay.com/photo/2014/12/21/23/33/cabbage-575525_1280.png'),(12,'Bell Pepper',75.00,'Veggies','Red, but not a tomato',2,7,'https://cdn.pixabay.com/photo/2012/04/13/21/00/bell-pepper-33623_1280.png'),(13,'Bread',1.50,'Bakery','Fluffy',2,22,'https://cdn.pixabay.com/photo/2018/05/01/14/55/bread-3365809_960_720.png'),(14,'ChocoChip Cookie',0.50,'Bakery','cookie with chocolate chips',2,99,'https://cdn.pixabay.com/photo/2018/02/25/12/06/cookie-3180329_1280.png'),(15,'Strawberry Cheesecake',9.75,'Bakery','Cheesecake + Strawberry',2,12,'https://cdn.pixabay.com/photo/2021/07/07/05/25/strawberry-cheesecake-6393283_1280.png'),(16,'Grape Wine',5.00,'Drinks','Squished grapes',2,17,'https://cdn.pixabay.com/photo/2017/01/20/11/37/grapes-1994647_1280.png'),(17,'Coffee',1.50,'Drinks','Liquid medium for caffeine',2,33,'https://cdn.pixabay.com/photo/2013/07/13/09/51/drink-156144_1280.png'),(18,'Tea',1.50,'Drinks','Leaf water',2,22,'https://cdn.pixabay.com/photo/2013/07/12/18/21/tea-153336_1280.png'),(19,'Strawberry Smoothie',3.00,'Drinks','Souls of strawberries',2,13,'https://cdn.pixabay.com/photo/2012/04/14/15/57/drinks-34377_1280.png'),(20,'Ice Cream Sandwich',2.75,'Frozen','Cookie + Ice Cream',2,25,'https://cdn.pixabay.com/photo/2021/07/11/06/54/ice-cream-sandwich-6403035_1280.png'),(21,'Popsicle',1.25,'Frozen','Cold thingy',2,18,'https://cdn.pixabay.com/photo/2020/04/29/02/53/popsicle-5106961_1280.png'),(22,'Sundae',2.00,'Frozen','Another cold thingy',2,16,'https://cdn.pixabay.com/photo/2014/04/03/10/02/sundae-309657_1280.png'),(23,'Ribs',12.00,'Meats','Great for BBQ',2,13,'https://cdn.pixabay.com/photo/2014/12/21/23/24/spare-ribs-575310_1280.png'),(24,'Bacon',2.30,'Meats','Strips of meat',2,11,'https://cdn.pixabay.com/photo/2014/12/21/23/25/bacon-575334_1280.png'),(25,'Turkey',8.00,'Meats','Gobble Gobble',2,14,'https://cdn.pixabay.com/photo/2012/04/02/12/48/turkey-24400_1280.png'),(26,'BBQ Skewer',1.00,'Meats','Assorted meat things',2,15,'https://cdn.pixabay.com/photo/2016/03/31/22/36/bbq-1297116_1280.png'),(27,'Milk',2.00,'Dairy','Cow milk',2,22,'https://cdn.pixabay.com/photo/2014/12/21/23/57/milk-576439_1280.png'),(28,'Cheese',3.00,'Dairy','Cheeeese',2,16,'https://cdn.pixabay.com/photo/2014/12/21/23/34/swiss-cheese-575542_1280.png'),(29,'Cream',2.50,'Dairy','Swishy',2,13,'https://cdn.pixabay.com/photo/2020/02/27/11/46/cream-carton-4884366_1280.png'),(30,'Cherry Yogurt',1.25,'Dairy','Yogurt but cherry',2,22,'https://cdn.pixabay.com/photo/2016/09/28/02/17/yogurt-1699648_1280.png');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (4,1,5,'Yum Frozen good'),(5,1,1,'Yuk Frozen bad');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `supplier_id` int unsigned NOT NULL,
  PRIMARY KEY (`supplier_id`),
  CONSTRAINT `supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (2);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_category`
--

DROP TABLE IF EXISTS `supplier_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier_category` (
  `supplier_id` int unsigned NOT NULL,
  `category` enum('Bakery','Veggies','Drinks','Frozen','Fruits','Meats','Dairy') NOT NULL,
  PRIMARY KEY (`supplier_id`,`category`),
  CONSTRAINT `s_id` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_category`
--

LOCK TABLES `supplier_category` WRITE;
/*!40000 ALTER TABLE `supplier_category` DISABLE KEYS */;
INSERT INTO `supplier_category` VALUES (2,'Bakery'),(2,'Veggies'),(2,'Drinks'),(2,'Frozen'),(2,'Fruits'),(2,'Meats'),(2,'Dairy');
/*!40000 ALTER TABLE `supplier_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supply_request`
--

DROP TABLE IF EXISTS `supply_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supply_request`
--

LOCK TABLES `supply_request` WRITE;
/*!40000 ALTER TABLE `supply_request` DISABLE KEYS */;
INSERT INTO `supply_request` VALUES (1,1,2,5,10,'2021-12-13 22:20:16','2021-12-16 16:12:15'),(2,1,2,1,10,'2021-12-13 22:30:30','2021-12-15 02:47:44'),(4,1,2,3,15,'2021-12-13 22:31:18','2021-12-15 02:47:48'),(5,1,2,4,15,'2021-12-13 22:31:25','2021-12-15 02:47:46'),(6,1,2,6,15,'2021-12-13 22:31:30','2021-12-16 16:45:15'),(7,1,2,7,15,'2021-12-13 22:31:32',NULL),(8,1,2,9,15,'2021-12-13 22:31:38',NULL),(9,1,2,1,6,'2021-12-16 20:53:11',NULL),(10,1,2,2,4,'2021-12-16 20:53:18',NULL),(11,1,2,3,12,'2021-12-16 20:53:24','2021-12-16 20:55:39'),(12,1,2,4,3,'2021-12-16 20:53:31','2021-12-16 20:56:07'),(13,1,2,5,7,'2021-12-16 20:53:39',NULL),(14,1,2,6,33,'2021-12-16 20:53:49',NULL),(15,1,2,22,13,'2021-12-16 20:53:59',NULL);
/*!40000 ALTER TABLE `supply_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-16 21:12:34
