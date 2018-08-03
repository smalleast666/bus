import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import indexRoutes from "./routes";

import './scss/mix.scss';

import registerServiceWorker from './registerServiceWorker';
import Header from './component/Header';

var hist = createBrowserHistory();

ReactDOM.render(
    [
        <Header />,
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} key={key} component={prop.component} />;
                })}
            </Switch>
        </Router>
    ], 
    document.getElementById('root')
);

registerServiceWorker();