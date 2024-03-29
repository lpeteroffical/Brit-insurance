# FastAPI Product Management Application
## Overview
This project is a FastAPI-based web application designed to manage products. It provides a REST API for adding, reading, and deleting products associated with authenticated users. Authentication is handled through Firebase Admin SDK, ensuring secure access to the application's functionalities.

## Features
User Authentication: Integration with Firebase for secure user authentication.
Product Management: Users can add, read, and delete products.
Database Integration: Uses SQLAlchemy and SQLite for database management.
Requirements
Ensure you have Python 3.6+ installed on your system. You will also need to have Firebase Admin SDK set up with a valid serviceAccountKey.json file for user authentication.

## Installation
Clone the repository to your local machine:

bash
Copy code
git clone https://your-repository-link.git
cd your-project-directory
Install the required dependencies:

bash
Copy code
pip install -r requirements.txt
Setup
Before running the application, ensure you have the serviceAccountKey.json file from Firebase in the project root directory. Update the firebase_key_path in main.py if your file is located elsewhere.

## Running the Application
To start the application, run:

bash
Copy code
uvicorn app.main:app --reload
The application will be available at http://127.0.0.1:8000. The --reload option makes the server restart upon code changes, which is useful during development.

## API Endpoints
POST /api/products: Add a new product. Requires a JSON body with name and price.
GET /api/products: Retrieve all products associated with the authenticated user.
DELETE /api/products/{product_id}: Delete a product by its ID.
GET /api/products/total: Get the total cost of all products for the authenticated user.
Authentication
All API endpoints require a valid Firebase JWT token to be included in the Authorization header as a Bearer token.

## Database Initialization
On the first run, the application will automatically create the SQLite database and the required tables. No additional setup is required for the database.

## CORS Configuration
CORS is configured to allow requests from http://localhost:3001. Modify the origins list in main.py to allow requests from other origins as needed.

## Contribution
Feel free to fork the repository and submit pull requests. For bugs and feature requests, please create an issue in the repository.

## Facts:
- fully working functionality as requirement
- extra remove product functionality
- extra database column: user id. this means all registered users have their own product list that they can manage
- summ calculated on the fly at the backend
- embeded sqlite database
- Firebase authentication client and serverside
- Firebase login & registration
- Embeded database init and table creation if it does not exist during the startup signal
- DB shutdown at app shutdown signal


## Shortcuts:
- No automatic testing added
- No git best practices applied
- No product deployment notes provided since this is not a production ready app.
- Some style related issues left in the code
- No github best practices applied
- Database is embeded, I would never do that in a production ready app.
- No containerisation
- No security configured
- Improvements:
  - There could be significantly better error handling, remote logging etc.
  - Code base optimisation








