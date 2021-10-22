import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* Custom Routes */
import PrivateRoute from './routes/PrivateRoute';

/* Components */
import NavBar from './components/NavBar/NavBar';

/* Containers */
import Page404 from './containers/Page404/Page404';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import UserInfo from './containers/UserInfo/UserInfo';

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <PrivateRoute path='/user' component={UserInfo} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/' component={Home} exact />
          <Route path='*' component={Page404} />
        </Switch>
      </main>
      <NavBar />
    </Router>
  );
}

export default App;
