import * as React from "react";
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';

import Homepage from './layouts/Homepage';
import LoginView from "./layouts/Login";
import { createBrowserHistory } from 'history';

const newHistory = createBrowserHistory();

function App() {
  return (
      <Provider store={store}>
        <Router history={newHistory} >
          <div className="App">
            <Switch>
              <Route exact path="/" ><Homepage /></Route>
              <Route exact path="/login/"><LoginView /></Route>
           </Switch>
        
        </div>
      </Router>
      </Provider>
  );
}

export default App;
