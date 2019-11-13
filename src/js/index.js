import "../styles/index.scss"
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { MainPage } from "./pages/MainPage"
import { AssociationsPage } from "./pages/AssociationsPage";
import { TextParaphrasePage } from "./pages/TextParaphrasePage";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/associations">
                <AssociationsPage/>
            </Route>
            <Route path="/paraphraser">
                <TextParaphrasePage/>
            </Route>
            <Route path="/">
                <MainPage/>
            </Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
