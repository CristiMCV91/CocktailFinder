// Import the express framework
import express from "express";
// Import body-parser middleware to parse the body of incoming requests
import bodyParser from "body-parser";
// Import axios to make HTTP requests
import axios from "axios";

// Create an express application
const app = express();
// Define the port the server will listen on
const port = 3000;
// Define the base URL for the Cocktail DB API
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

// Serve static files from the "public" directory
app.use(express.static("public"));

// Use body-parser to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the root path
app.get("/", async (req, res) => {
  // Array of alphabet letters
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  try {
    // Array of popular ingredients
    const popularIngredients = ["Vodka", "Gin", "Rum", "Tequila"];
    // Make a request to get a random cocktail
    const response = await axios.get(API_URL + "random.php");
    const result = response.data.drinks[0];
    // Make a request to get the list of ingredients
    const ingredients = (await axios.get(API_URL + "/list.php?i=list")).data.drinks;

    // Render the index.ejs template with the retrieved data
    res.render("index.ejs", {
      cocktailImage: result.strDrinkThumb,
      cocktailName: result.strDrink,
      cocktailId: result.idDrink,
      popularIngredients: popularIngredients,
      ingredients: ingredients,
      alphabet: alphabet
    });
  } catch (error) {
    // Log any errors that occur
    console.error("Failed to make request:", error.message);
    // Render the index.ejs template without data in case of an error
    res.render("index.ejs");
  }
});

// Define a route to get a cocktail by its ID
app.get("/cocktail/id/:id", async (req, res) => {
  const cocktailId = req.params.id;
  try {
    // Make a request to get the cocktail details by ID
    const response = await axios.get(API_URL + "lookup.php?i=" + cocktailId);
    const result = response.data.drinks[0];
    // Render the cocktail.ejs template with the cocktail data
    res.render("cocktail.ejs", {
      cocktail: result
    });
  } catch (error) {
    // Log any errors that occur
    console.error("Failed to make request:", error.message);
    // Redirect to the root path in case of an error
    res.redirect("/");
  }
});

// Define a route to get cocktails by an ingredient
app.get("/ingredient/:ingredientName", async (req, res) => {
  const ingredientName = req.params.ingredientName;
  try {
    // Make a request to get cocktails by ingredient
    const response = await axios.get(API_URL + "filter.php?i=" + ingredientName);
    const result = response.data.drinks;
    // Render the find-cocktails.ejs template with the ingredient and cocktail data
    res.render("find-cocktails.ejs", {
      ingredient: ingredientName,
      cocktails: result
    });
  } catch (error) {
    // Log any errors that occur
    console.error("Failed to make request:", error.message);
    // Redirect to the root path in case of an error
    res.redirect("/");
  }
});

// Define a route to get cocktails by the first letter of their name
app.get("/first-letter/:firstLetter", async (req, res) => {
  const firstLetter = req.params.firstLetter;
  try {
    // Make a request to get cocktails by first letter
    const response = await axios.get(API_URL + "search.php?f=" + firstLetter);
    const result = response.data.drinks;
    // Render the find-cocktails.ejs template with the first letter and cocktail data
    res.render("find-cocktails.ejs", {
      firstLetter: firstLetter,
      cocktails: result
    });
  } catch (error) {
    // Log any errors that occur
    console.error("Failed to make request:", error.message);
    // Redirect to the root path in case of an error
    res.redirect("/");
  }
});

// Define a route to get cocktails by their type (alcoholic or non-alcoholic)
app.get("/cocktail-type/:type", async (req, res) => {
  const cocktailType = req.params.type;
  try {
    // Make a request to get cocktails by type
    const response = await axios.get(API_URL + "filter.php?a=" + cocktailType);
    const result = response.data.drinks;
    // Render the find-cocktails.ejs template with the cocktail type and cocktail data
    res.render("find-cocktails.ejs", {
      cocktailType: cocktailType,
      cocktails: result
    });
  } catch (error) {
    // Log any errors that occur
    console.error("Failed to make request:", error.message);
    // Redirect to the root path in case of an error
    res.redirect("/");
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
