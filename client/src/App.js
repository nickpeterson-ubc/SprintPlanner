import React from "react";
import "./styles/app.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import SelectTeamBoard from "./components/SelectTeamBoard";

import axios from 'axios';
import Profile from "./components/Profile";
import TicketPage from "./components/TicketPage";

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/login" component={Login} exact/>
                    <Route path="/register" component={Register} exact/>
                    <Route path="/profile" component={Profile} exact/>
                    <Route path="/board" component={SelectTeamBoard} exact/>
                    <Route path='/ticket/:id' component={TicketPage} exact/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;