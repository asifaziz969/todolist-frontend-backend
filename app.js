// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Create an Express application
const app = express();
app.set("view engine", "ejs");

const port = 5000;

// var items = ["i go to office", "i eat pasta", "i play golf"];

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://asif:asif@cluster0.1umxkr2.mongodb.net/todolistDB"); //connection ,it is db

const itemsSchema = {
  //schema
  name: String,
};

const Item = mongoose.model("Item", itemsSchema); //model ,it is collection

const item1 = new Item({
  //document
  name: "welcome to your todolist",
});

const item2 = new Item({
  name: "hit the plus button to add",
});

const item3 = new Item({
  name: "hit the plus button to delere",
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems,{
//   if(err){
//     console.log(err);
//   }

// });

// Define a route for the root path ('/')
app.get("/", async (req, res) => {
  try {
    const foundItems = await Item.find({}).exec();
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, {
        if(err) {
          console.log(err);
        },
      });
      res.redirect("/");
    }
    res.render("list", { today: formattedDate, newListItems: foundItems });
  } catch (err) {
    // Handle any errors that occur during the database query
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
const currentDate = new Date();

var option = {
  weekday: "long",
  day: "numeric",
  month: "long",
};
const formattedDate = currentDate.toLocaleDateString("en-US", option);

// Render the 'list' EJS template and pass the 'day' variable

app.post("/", (req, res) => {
  const inputData = req.body.newItem;

  const item = new Item({
    name: inputData,
  });
  item.save();

  // items.push(inputData);

  // Redirect to the root path after adding a new item
  res.redirect("/");
});

// Start the Express application
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
