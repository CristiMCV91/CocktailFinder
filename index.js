import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  try {
    const popularIngredients = ["Vodka", "Gin", "Rum", "Tequila"];
    const response = await axios.get(API_URL+"random.php");
    const result = response.data.drinks[0];
    const ingredients = (await axios.get(API_URL+"/list.php?i=list")).data.drinks;

    res.render("index.ejs", {
      cocktailImage: result.strDrinkThumb,
      cocktailName: result.strDrink,
      cocktailId: result.idDrink,
      popularIngredients: popularIngredients,
      ingredients: ingredients,
      alphabet: alphabet
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs")
  }
});

app.get("/cocktail/id/:id", async (req, res) => {
  const cocktailId = req.params.id;
  try {
    const response = await axios.get(API_URL+"lookup.php?i="+cocktailId);
    const result = response.data.drinks[0];
    console.log(result);
    res.render("cocktail.ejs", {
      cocktail: result
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.redirect("/")
  }
});


app.get("/ingredient/:ingredientName", async (req, res) => {
  const ingredientName = req.params.ingredientName;
  try {
    const response = await axios.get(API_URL+"filter.php?i="+ingredientName);
    const result = response.data.drinks;
    console.log(result);
    res.render("find-cocktails.ejs", {
      ingredient: ingredientName,
      cocktails: result
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.redirect("/")
  }
});

app.get("/first-letter/:firstLetter", async (req, res) => {
  const firstLetter = req.params.firstLetter;
  try {
    const response = await axios.get(API_URL+"search.php?f="+firstLetter);
    const result = response.data.drinks;
    console.log(result);
    res.render("find-cocktails.ejs", {
      firstLetter: firstLetter,
      cocktails: result
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.redirect("/")
  }
});

app.get("/cocktail-type/:type", async (req, res) => {
  const cocktailType = req.params.type;
  try {
    const response = await axios.get(API_URL+"filter.php?a="+cocktailType);
    const result = response.data.drinks;
    console.log(result);
    res.render("find-cocktails.ejs", {
      cocktailType: cocktailType,
      cocktails: result
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.redirect("/")
  }
});






  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });