import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* Custom Routes */
import PrivateRoute from './routes/PrivateRoute';

/* Components */
import SessionExpiredModal from './components/SessionExpiredModal/SessionExpiredModal';

/* Containers */
import Page404 from './containers/Page404/Page404';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import Profile from './containers/Profile/Profile';
import MyItems from './containers/MyItems/MyItems';
import Settings from './containers/Settings/Settings';
import ManageItem from './containers/ManageItem/ManageItem';
import Cart from './containers/Cart/Cart';

function App() {
  return (
    <>
      <SessionExpiredModal />
      <Router>
        <Switch>
          <PrivateRoute path='/my-items/new'>
            <ManageItem mode='new' />
          </PrivateRoute>
          <PrivateRoute path='/my-items/:itemId'>
            <ManageItem mode='edit' />
          </PrivateRoute>
          <PrivateRoute path='/user' component={Profile} />
          <PrivateRoute path='/cart' component={Cart} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <PrivateRoute path='/my-items' component={MyItems} />
          <PrivateRoute path='/settings' component={Settings} />
          <PrivateRoute path='/' component={Home} exact />
          <Route path='*' component={Page404} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
