# node-mysql-hw

## What is bAmazon app

bAmazon customer app is an Amazon-like storefront that interacts with a MySql database. The app will take in orders from customers and deplete stock from the store's inventory, via the command line interface. 

## App organization

At a high-level **bamazonCustomer.js** is our main javascript file that node runs. All of the other files are supporting files. **bamazon.sql** is our schema for MySql database creation.

## How to run the app

In the command line, type in:

`node bamazonCustomer.js` 

And follow the on screen instructions. 

## Demo video

Since this is a command line application, it will need to run inside your terminal. Here is a video walkthrough of the application: 

[Video demonstration](https://youtu.be/t6XiegFrWEI)

## Technologies/Modules used

Here are some NPM modules used in this application

* msql (for easier connection with MySql database)
* inquirer (interactions for the command line)
* cli-table (allowing for rendering of unicode tables on the command line)

## My role

Coder and Designer of bAmazon app