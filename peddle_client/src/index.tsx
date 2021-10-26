import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ScrollableList from "./ScrollableList";
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

const store = createStore(
  rootReducer, 
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <ScrollableList />
  </Provider>,
  document.getElementById('root')
);