# React Product Management Application
## Overview
This React application provides a simple yet secure platform for product management. It allows authenticated users to add, view, and delete products, as well as view a summary of total product costs. Authentication is handled via Firebase, ensuring secure access to the application's functionalities.

## Features
Firebase Authentication: Secure user authentication using Firebase.
Product Management: Authenticated users can add, view, and delete products.
Summary View: Users can view the total cost of their products.
Protected Routes: Certain routes are protected and only accessible to authenticated users.

## Installation
Before you start, ensure you have Node.js and npm installed on your system.

Clone the repository to your local machine.
Navigate to the project directory.
Install the required dependencies:
bash
Copy code
npm install
Setup
Create a Firebase project and configure authentication according to your requirements. Ensure you set up Firebase in your project and replace the Firebase configuration with your own details.

## Running the Application
To start the application, run:

bash
Copy code
npm start
This will run the app in development mode. Open http://localhost:3000 to view it in your browser.

## Building for Production
To build the app for production, run:

bash
Copy code
npm run build
This builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Usage
Upon starting the app, you will be presented with a login/sign-up screen. After authentication, you can add new products, view a list of existing products, and delete them. Navigate to the summary page to view the total cost of all products.

## Contributing
Contributions are welcome! Please feel free to submit pull requests or create issues for bugs and feature requests.

## Facts
- Covers 100% of the functional requirements
- Extra functionality: product remove X on the right side of the product list

## Shortcuts
- No automatic component tests, integration test etc.
- No constants used for example for the backend URLs
- No security configured on the hosting service
- No git best practices applied
- Several styling issues visible as a lack of time to complete the project
- No production deployment notes provided since this is not a production ready app.
- There could be several improvements:
  - Well thought out error handling, remote logging etc.
  - Optimised code base

