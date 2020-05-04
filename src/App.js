import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Location from './Location';
import AddLocation from './AddLocation';

function App() {
  return (<Router>
    <div className="App">
      <div>
        <div>
          <Switch>
            <Route exact path='/' component={Location} />
            <Route path="/add-Location" component={AddLocation} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
