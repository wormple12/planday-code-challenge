import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Section01, NoMatch } from "./screens";
import { NavTab } from '@Components/shared/NavBar/NavBar';

export const MainRoutes: React.FC = props => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={Section01} />
            <Route component={NoMatch} />
        </Switch>
    );
};

export const navTabs: NavTab[] = [
    { label: "Browse Images", path: "/", exact: true },
    { label: "Add Image", path: "/add", exact: true },
];