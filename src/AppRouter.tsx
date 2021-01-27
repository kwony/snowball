import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import MainPage from './components/MainPage';

const AppRouter = (props: any) => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;