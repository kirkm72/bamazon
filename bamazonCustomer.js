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
    console.log("DB connection id# " + connection.threadId);
    displayItems();
});

function checkIfExit(choice) {
    if (choice.toLowerCase() === "q") {
        console.log("Thank you. Come again!"); // exit message
        process.exit(0);
    }
};

function checkInv(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === choiceId) {
            return inventory[i]; //return if product found
        }
    }
    return null;
};

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) { // Selects all products
        if (err) throw err;
        console.table(res); // Built in table creator with response
        prompt4Item(res); // Uses inquirer to ask what to buy
    });
};

function prompt4Item(inventory) {
    inquirer //inquirer module to ask what item to buy
        .prompt([
            {
                type: "input",
                name: "choice",
                message: "Enter product ID# to buy [Q to Quit]",
                validate: function (val) {
                    return !isNaN(val) || val.toLowerCase() === "q"; // checks if ID is valid or if "q" selected
                }
            }
        ])
        .then(function (val) {
            checkIfExit(val.choice);
            let prodId = parseInt(val.choice);
            let product = checkInv(prodId, inventory);
            if (product) { // If valid prodID then prompt for quantity
                prompt4Quantity(product);
            }
            else {
                console.log("\nSorry. Don't carry that item."); //display do not carry error if # not found 
                displayItems();
            }
        });
}

function prompt4Quantity(product) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "How many would you like? [Q to Quit]",
                validate: function (val) {
                    return val > 0 || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function (val) {
            checkIfExit(val.quantity);
            let quantity = parseInt(val.quantity);
            if (quantity > product.stock_quantity) { //ensure enough inventory to sell
                console.log("We don't have that many. Sorry.");
                displayItems();
            }
            else {
                buy(product, quantity); // if enough, allow sale.
            }
        });
}

function buy(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function (err, res) {
            // Let the user know the purchase was successful, re-run loadProducts
            console.log("You just bought " + quantity + " " + product.product_name + "'s!");
            displayItems(); // show table with new inv amounts.
        }
    );
}
