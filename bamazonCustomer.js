// NPM packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });


// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// Begin inventory display
var start = function () {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        // Generate CLI table
        var theDisplayTable = new Table({
            head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity']
        });
        // Set table headings and loop through inventory
        for (var i = 0; i < res.length; i++) {
            theDisplayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }

        console.log(theDisplayTable.toString());

        generateQuestions(res)
    })

}
function generateQuestions(res) {
    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "What is the ID Number of the item you would like to buy? [quit with Q]"
        }]).then(function (answer) {
            var correct = false;
            if (answer.choice.toUpperCase() == "Q") {
                process.exit();
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id == answer.choice) {
                    correct = true;
                    var product = answer.choice;
                    var id = i;
                    inquirer.prompt({
                        name: "quant",
                        type: "input",
                        message: "How many units of the product they would like to buy?",
                        validate: function (value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function (answer) {
                        if ((res[id].stock_quantity - answer.quant) > 0) {
                            connection.query("UPDATE products SET stock_quantity='"
                                + (res[id].stock_quantity - answer.quant)
                                + "'WHERE item_id='" + product
                                + "'", function (err, res2) {
                                    console.log(answer.quant + " items purchased. " + res[id].stock_quantity + " items left in inventory.");
                                    //start();
                                    setTimeout(start, 1500);
                                })

                        } else {
                            console.log("Sorry, there isn't enough inventory for that purchase amount.");
                            generateQuestions(res);
                        }

                    })
                }
            }
            if (i == res.length && correct == false) {
                console.log("not valid")
                generateQuestions(res);
            }
        })
}