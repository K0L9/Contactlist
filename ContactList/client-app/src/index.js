import { Component } from "react"
import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid"

//import Routing
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

//Import css file
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./index.css";

//Import components
import Main from "./Components/Main/Main"
import NotFound from "./Components/NotFound/NotFound"
import AddContact from "./Components/AddContact/AddContact"
import EditContact from "./Components/EditContact/EditContact"

//import services
import APIService from "./Services/APIService"

//import store
import store from "./store"
import { Provider } from "react-redux"

class App extends Component {
  service = new APIService();

  render() {
    return (
      <Router>
        <Switch>
          <Provider store={store}>
            <Route path="/" exact render={() => (<Main />)} />
            <Route path="/add-contact" exact render={() => (<AddContact />)} />
            <Route path="/edit-contact" exact render={() => (<EditContact />)} />
          </Provider>
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));