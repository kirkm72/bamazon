CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE `products` (
`item_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
`product_name` varchar(32) NOT NULL, 
`department_name` varchar(16) NOT NULL,
`price` int,
`stock_quantity` int);
