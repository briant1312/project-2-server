# Recipe Tracker

This is a very simple recipe tracker app that allows you to store all of your favorite recipes in one place. Simply create a profile, login and start adding recipes to your collection now.

## Technologies Used:

---

- NodeJS
- Express
- Mongoose

## Entity Relationship Diagram

![alt text](./wireframes/ERD.png)

## Route Tables:

--- 

| Name        | Path                             |HTTP Verb    |Purpose                  |
|-------------|----------------------------------|-------------|-------------------------|
| Index       | /recipes/                        |GET          |Displays all user recipes|
| Create      | /recipes/                        |POST         |Creates a new recipe     |
| Show        | /recipes/:recipeId               |GET          |Displays one recipe      |
| Update      | /recipes/:recipeId               |PATCH        |Updates one recipe       |
| Delete      | /recipes/:recipeId               |DELETE       |Deletes one recipe       |
| SignUp      | /sign-up                         |POST         |Creates new user         |
| SignIn      | /sign-in                         |POST         |Logs user in             |