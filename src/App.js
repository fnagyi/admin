import React from 'react';
import { Layout } from './pages';
import {Admin} from "./pages/admin/admin"
import {HashRouter  as Hash, Route , Switch} from "react-router-dom" ;
import WrappedForm from "./pages/login"


function App() {
  return (
    <div className="app">
      <Hash
        basename="/"
      >
        <Switch>
          <Route path="/login" component={WrappedForm}/>
          <Route path="/" component={Admin} />
        </Switch>

      </Hash>
    </div>
  );
}

export default App;