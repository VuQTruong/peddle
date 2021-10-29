import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* Custom Routes */
import PrivateRoute from './routes/PrivateRoute';

/* Containers */
import Page404 from './containers/Page404/Page404';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import Profile from './containers/Profile/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/user' component={Profile} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <PrivateRoute path='/' component={Home} exact />
        <Route path='*' component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
