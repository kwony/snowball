import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import './AppRouter.scss'
import Container from './components/Container';
import MainPage from './components/MainPage';

const AppRouter = (props: any) => (
    <BrowserRouter>
        <div className="app_base">
            <Switch>
                <Route path="/" exact={true} component={Container} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;