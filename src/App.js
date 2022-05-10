import * as React from "react";
import { Provider } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import store from './redux/store';

import Homepage from './layouts/Homepage';

function App() {
  return (
      <Provider store={store}>
      <div className="App">
        <Routes>
            <Route path="/" element={<Homepage />}/>
        </Routes>
      </div>
      </Provider>
  );
}

export default App;
