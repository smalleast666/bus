import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';

import indexRoutes from "./routes";

import registerServiceWorker from './registerServiceWorker';
import Header from './component/Header';

var hist = createBrowserHistory();

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
      },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Header />
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} key={key} component={prop.component} />;
                })}
            </Switch>
        </Router>
    </MuiThemeProvider>, 
    document.getElementById('root')
);

registerServiceWorker();