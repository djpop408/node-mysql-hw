DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("knife", "kitchenware", 5, 60)
		,("spoon", "kitchenware", 5, 60)
        ,("fork", "kitchenware", 5, 60)
        ,("plate", "kitchenware", 8, 40)
        ,("bowl", "kitchenware", 8, 40)
        ,("napkins", "kitchenware", 10, 40)
        ,("cup", "kitchenware", 7, 40)
        ,("microwave", "kitchen appliances", 150, 15)
        ,("toaster", "kitchen appliances", 50, 10)
        ,("blender", "kitchen appliances", 70, 10);

SELECT * FROM products;