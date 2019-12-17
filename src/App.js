import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar-wrapper">
          <div className="navbar">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/profile" className="navbar-item">
              Profile
            </Link>
          </div>
        </nav>

        <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Home />
      </div>
    </Router>
  );
}

export default App;
