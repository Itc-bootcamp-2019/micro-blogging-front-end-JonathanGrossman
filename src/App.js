import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/profile" className="navbar-item">
            Profile
          </Link>
        </nav>

        <Switch>
          <Route path="/">{/* Home component goes here */}</Route>
          <Route path="/about">{/* Profile component goes here */}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
