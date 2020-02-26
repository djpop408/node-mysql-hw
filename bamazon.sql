DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("knife", "kitchenware", 5, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("spoon", "kitchenware", 5, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fork", "kitchenware", 5, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("plate", "kitchenware", 8, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bowl", "kitchenware", 8, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("napkins", "kitchenware", 10, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cup", "kitchenware", 7, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("microwave", "kitchen appliances", 150, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toaster", "kitchen appliances", 50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blender", "kitchen appliances", 70, 10);

SELECT * FROM products;