import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AppContext from "./context/AppContext.js";

function App() {
  const [userName, setUserName] = useState("");
  const savedName = localStorage.getItem("microBlogUserName");

  useEffect(() => {
    if (savedName === "undefined" || savedName === null) {
      setUserName("User Name");
    } else {
      setUserName(savedName);
    }
  }, [savedName]);
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
          <AppContext.Provider value={{ userName, setUserName }}>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </AppContext.Provider>
          {/* <Route exact path="/profile">
            <Profile userName={userName} setUserName={setUserName} />
          </Route> */}
          {/* <Route exact path="/">
            <Home userName={userName} />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
