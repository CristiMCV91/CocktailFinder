# Cocktail Finder

Cocktail Finder is a web-based application that allows users to explore various cocktails by ingredients, first letters, and types. The application provides detailed information about each cocktail, including ingredients, measurements, instructions, and the type of glass to use.

## API Used
This application uses a public API [TheCocktailDB](https://www.thecocktaildb.com/api.php) to fetch data about cocktails. The API provides a wide range of endpoints to access cocktail information.

## Features

- **Random Cocktail Display**: Showcases a randomly selected cocktail on the homepage.
- **Search by Ingredient**: Allows users to find cocktails based on specific ingredients.
- **Search by First Letter**: Enables users to find cocktails that start with a specific letter.
- **Search by Type**: Provides an option to search for cocktails based on their type, such as alcoholic, optional alcohol, and non-alcoholic.
- **Cocktail Details**: Displays detailed information about a selected cocktail, including ingredients, measurements, instructions, and the type of glass to use.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **EJS**: Embedded JavaScript templating.
- **Bootstrap**: Front-end framework for responsive web design.
- **Bootstrap Icons**: Icon library for Bootstrap.
- **Nodemon**: Utility that monitors for changes in source code and automatically restarts the server.

## Project Structure

- `package.json`: Contains the project’s metadata, dependencies, and scripts.
- `index.js`: Main server file using Express.js to set up routes and handle requests.
- `views/`: Contains EJS templates for rendering HTML pages.
  - `partials/`: Contains partial templates for the header and footer.
  - `index.ejs`: Template for the homepage.
  - `cocktail.ejs`: Template for displaying cocktail details.
  - `find-cocktails.ejs`: Template for displaying search results.
- `public/`: Contains static assets such as CSS, images, and client-side JavaScript.
  - `css/`: Custom CSS styles for the application.
  - `images/`: Images used in the application.
- `styles.css`: Custom CSS for styling various components of the application.


## Development

- **Author**: Cristian M.
- **Version**: 1.0
- **Date**: 18.07.2024

## Contributing
Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve the application.