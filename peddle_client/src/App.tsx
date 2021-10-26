import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* Custom Routes */
import PrivateRoute from './routes/PrivateRoute';

/* Containers */
import Page404 from './containers/Page404/Page404';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import Shopping from "./containers/Shopping/Shopping";
import UserInfo from './containers/UserInfo/UserInfo';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/user' component={UserInfo} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/shopping' component={Shopping} />
        <Route path='/' component={Home} exact />
        <Route path='*' component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
