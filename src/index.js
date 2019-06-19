import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import reducers from './store/reducers';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
