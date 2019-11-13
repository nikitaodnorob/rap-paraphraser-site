import "../styles/index.scss"
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { MainPage } from "./pages/MainPage"
import { AssociationsPage } from "./pages/AssociationsPage";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/associations">
                <AssociationsPage/>
            </Route>
            <Route path="/">
                <MainPage/>
            </Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
