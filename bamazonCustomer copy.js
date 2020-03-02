var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "tatert0ts",
    database: "bamazon"
  });

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

// function which prompts the user for what action they should take
function start() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        //new table with cli-table package
        var table = new Table({
            head: ["Item ID", "Product Name", "Department", "Price $", "Quantity"],
            //colWidths: [8, 24, 24, 8, 8]
        });

        console.log("-------------------" + "\nITEMS FOR SALE: " + "\n-------------------");
        
        //loop and generate table
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name,
            res[i].price, res[i].stock_quantity]);
        }

        //logs the table with items in for purchase
        console.log(table.toString());
        //call promptCustomer function
        promptCustomer(res);
    });
  };

    var promptCustomer = function (res) {
        inquirer.prompt([

            {
              type: "input",
              name: "item",
              message: "What would you like to buy?  Select by Item #",
            },
            {
              type: "input",
              name: "quantity",
              message: "How many would you like?",
            }
        
          ]).then(function (bamazon) {
            productId = bamazon.item;
            if (bamazon.quantity > 1) {
              endingString = "s.";
            } else {
              endingString = ".";
            };
        
            connection.query("SELECT product_name, stock_quantity, price FROM products WHERE ?", {
              item_id: bamazon.item
            }, function (err, res) {
              if (err) throw err;
              productName = res[0].product_name;
              updateProducts(res[0].stock_quantity, bamazon.quantity, res[0].price);
            });
          });
    }

    //function to use when finished shopping//

var doneShopping = function () {
    inquirer.prompt([{
      type: "list",
      name: "done",
      message: "Did you want to buy anything else?",
      choices: ["Yes", "No"]
    }]).then(function (done) {
      console.log(done.done);
      if (done.done === "Yes") {
        showProducts(askShopper);
      } else {
        console.log("Thanks for shopping at Bamazon!  Have a nice day!");
  
        connection.end();
      }
    });
  };
  
  //function to update stock after purchase has been made
  
  var updateProducts = function (quantity, purchased, price) {
    let total_cost = parseFloat(purchased) * parseFloat(price);
    let remainingInventory = quantity - purchased;
    if (remainingInventory < 0) {
      console.log("Insufficent quantity! we currently do not have enough in stock.");
      doneShopping();
    } else {
      connection.query("UPDATE product item_id = ? SET stock_quantity = ? WHERE ?", [remainingInventory, total_cost, {
        item_id: productId
      }], function (err, res) {
        if (err) throw err;
        console.log("-------------------------------------");
        console.log("You just purchased " + purchased + " " + productName + "(s)");
        console.log("The total cost is $" + total_cost);
        console.log("-------------------------------------");
        doneShopping();
      });
    }
  };