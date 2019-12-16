import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
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
