import './App.css';
import { Redirect, Route, Switch } from "react-router-dom";
import Persons from "./views/persons";
import NewPerson from "./views/NewPerson";
import Welcome from "./views/welcome";


function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/Departments/admin" />

        <Route exact path="/Departments/admin">
          <Welcome />
        </Route>

        <Route exact path="/Departments/Contacts">
          <Persons />
        </Route>

        <Route exact path="/Departments/Contact/new">
          <NewPerson />
        </Route>

        {/*<Route exact path="/Departments/Contact/:id">
          <Person />
        </Route>

        <Route exact path="/Departments/Contact/:id/edit">
          <EditPerson />
        </Route>

  <Route component={NotFound} />*/}
      </Switch>
    </div>
  )
}

export default App;
