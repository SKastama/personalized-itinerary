import './App.css';
import { Redirect, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import UserList2 from "./views/HomePage2";
import NewPerson2 from "./views/NewPerson2";
// import Login from "./views/Login";
import Details from "./views/Details";
import NodeMailer from "./views/NodeMailer";
import EditPerson from './views/EditPerson';
import SignUp from './views/SignUp';
import LogReg from "./views/LogReg";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/Departments/admin" />

        <Route exact path="/Departments/admin">
          <LogReg setLoggedIn={() => setIsLoggedIn(true)} path="/" />
        </Route>

        <Route exact path="/send">
          <NodeMailer />
        </Route>

        <Route exact path="/Departments/admin/signup">
          <SignUp />
        </Route>

        <Route exact path="/Departments/Contacts">
          <UserList2 />
        </Route>

        <Route exact path="/Departments/Contacts/new">
          <NewPerson2 />
        </Route>

        <Route exact path="/Departments/Contacts/:id">
          <Details />
        </Route>

        <Route exact path="/Departments/Contacts/:id/edit">
          <EditPerson />
        </Route>

        {/*<Route exact path="/Departments/Contact/:id">
          <Person />
        </Route>
  <Route component={NotFound} />*/}
      </Switch>
    </div>
  )
}

export default App;