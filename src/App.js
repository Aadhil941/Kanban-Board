import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Strategy from "./Components/Strategy/Strategy";
import ProjectQuater from "./Components/ProjectQuater/ProjectQuater";
import Header from "./Components/Header/Header";

function App() {

  return (
    <Router>
      <div className="app">
        <div className="app_nav">
          <Header />
        </div>
        <div className="app_main_container">
          <Switch>
            <Route exact path="/">
              <Strategy />
            </Route>
            <Route path="/strategy">
              <ProjectQuater />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
