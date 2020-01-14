const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id# " + connection.threadId + "\n");
    displayItems();
});

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) { // Selects all products
        if (err) throw err;
        console.table(res); // Built in table creator with response
        //promptCustomer(res); // Uses inquirer to ask what to buy
    });
}