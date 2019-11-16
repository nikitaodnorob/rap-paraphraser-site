import React from "react"
import {AssociationsPage} from "./pages/AssociationsPage";
import {TextParaphrasePage} from "./pages/TextParaphrasePage";
import {MainPage} from "./pages/MainPage";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"

export const App = () => {
    const urlParams = new URLSearchParams(location.search);
    const pageRequest = urlParams.get("page");
    console.log({pathname: `/${pageRequest}`});
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/associations">
                    <AssociationsPage/>
                </Route>
                <Route path="/paraphraser">
                    <TextParaphrasePage/>
                </Route>
                <Route path="/">
                    { pageRequest ? <Redirect to = {`/${pageRequest}`} /> : <MainPage/> }
                </Route>
            </Switch>
        </BrowserRouter>
    );
};