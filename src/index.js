import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import reducer from './store/reducers/reducer';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

import thunk from 'redux-thunk';

const loggerWare = state => {
    return next => {
        console.log('[Middleware] ', state);
        return action => {
            console.log('[Middleware action] ', action);
            return next(action);
        }
    }
};

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(loggerWare, thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>

);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
