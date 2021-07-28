import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Inicio from './components/Inicio'
import Admin from './components/Admin'
import Login from './components/Login'
import Menu from './components/Menu'
function App() {
  return (
    <div className="container">
      <Router>
      <Menu></Menu>
        <Switch>
          <Route exact path='/'><Inicio/></Route>
          <Route path='/admin'><Admin/></Route>
          <Route path='/login'><Login/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
