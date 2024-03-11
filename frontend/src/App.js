import React from "react";
import "./App.css";
import Auth from "./Auth";
import Form from "./Form";
import Summary from "./Summary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Note the change here from 'Switch' to 'Routes'
import ProtectedRoute from "./ProtectedRoute"; // Ensure you've implemented logic to work with React Router v6 if using a ProtectedRoute component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {" "}
          <Route exact path="/" element={<Auth />} />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <Summary />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
