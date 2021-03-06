import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Custom Routes */
import PrivateRoute from "./routes/PrivateRoute";

/* Components */
import SessionExpiredModal from "./components/SessionExpiredModal/SessionExpiredModal";

/* Containers */
import UserMessages from "./containers/UserMessages/UserMessages";
import ChatScreen from "./containers/UserMessages/ChatScreen";
import Page404 from './containers/Page404/Page404';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import Profile from './containers/Profile/Profile';
import Shopping from './containers/Shopping/Shopping';
import Settings from "./containers/Settings/Settings";

import MyItems from './containers/MyItems/MyItems';
import ManageItem from './containers/ManageItem/ManageItem';
import PurchaseHistory from './containers/PurchaseHistory/PurchaseHistory';
import SellHistory from './containers/SellHistory/SellHistory';
import Cart from './containers/Cart/Cart';
import UpgradeToPro from './containers/UpgradeToPro/UpgradeToPro';
import FilterItems from './containers/FilterItems/FilterItems';


function App() {
  return (
    <>
      <SessionExpiredModal />
      <Router>
        <Switch>
          <PrivateRoute path="/my-items/new">
            <ManageItem mode="new" />
          </PrivateRoute>
          <PrivateRoute path="/my-items/:itemId">
            <ManageItem mode="edit" />
          </PrivateRoute>

          <PrivateRoute path='/user' component={Profile} />
          <PrivateRoute path='/cart' component={Cart} />
          <PrivateRoute path='/search' component={FilterItems} />
          <PrivateRoute path='/upgrade' component={UpgradeToPro} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <PrivateRoute path='/my-items' component={MyItems} />
          <PrivateRoute path='/purchase-history' component={PurchaseHistory} />
          <PrivateRoute path='/sell-history' component={SellHistory} />
          <PrivateRoute path='/settings' component={Settings} />
          <PrivateRoute path='/' component={Home} exact />
          <PrivateRoute path='/shopping' component={Shopping} exact />
          <PrivateRoute path="/user-messages" component={UserMessages} />
          <PrivateRoute path="/chat-screen" component={ChatScreen} exact />
          <PrivateRoute path='/search' component={FilterItems} />
          <PrivateRoute path="/my-items" component={MyItems} />
          <PrivateRoute path="/purchase-history" component={PurchaseHistory} />
          <PrivateRoute path="/sell-history" component={SellHistory} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/" component={Home} exact />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
