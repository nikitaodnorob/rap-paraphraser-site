import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {AssociationsPage} from './pages/AssociationsPage';
import {TextParaphrasePage} from './pages/TextParaphrasePage';
import {MainPage} from './pages/MainPage';

export const App = () => {
    const urlParams = new URLSearchParams(location.search);
    const pageRequest = urlParams.get('page');
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/associations">
                    <AssociationsPage />
                </Route>
                <Route path="/paraphraser">
                    <TextParaphrasePage />
                </Route>
                <Route path="/">
                    {
                        pageRequest ? <Redirect to = {`/${pageRequest}`} /> : <MainPage />
                    }
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
