CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE `products` (
`item_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
`product_name` varchar(32) NOT NULL, 
`department_name` varchar(16) NOT NULL,
`price` int,
`stock_quantity` int);

INSERT INTO products
(item_id, product_name, department_name, price, stock_quantity)
VALUES 
(1, "baseball cap", "apparel", 20,5),
(2, "fishing rod", "sporting goods", 200,3),
(3, "fishing reel", "sporting goods", 250,2),
(4, "crankbait", "sporting goods", 12,20),
(5, "shirt", "apparel", 20,40),
(6, "rain coat", "apparel", 120,5),
(7, "fishing line", "sporting goods", 40,7),
(8, "treble hooks", "sporting goods", 8,20),
(9, "rain boots", "apparel", 120,3),
(10, "socks", "apparel", 10,0);