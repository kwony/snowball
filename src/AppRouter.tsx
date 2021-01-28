import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import MainPage from './components/MainPage';
import './AppRouter.scss'

const AppRouter = (props: any) => (
    <BrowserRouter>
        <div className="app_base">
            <Switch>
                <Route path="/" exact={true} component={MainPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;