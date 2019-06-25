import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import pizzaMakerReducers from './store/reducers/pizzaMaker';
import orderReducers from './store/reducers/orders';
import authReducers from './store/reducers/auth';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    order: orderReducers,
    pizzaMaker: pizzaMakerReducers,
    auth: authReducers
})
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

serviceWorker.unregister();
