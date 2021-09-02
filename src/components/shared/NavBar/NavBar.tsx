import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.scss';

export type NavTab = {
    label: string,
    path: string,
    exact?: boolean,
    onClick?: () => void,
    float?: "right" | "left",
};
type Props = {
    tabs: NavTab[],
}

export const NavBar: React.FC<Props> = props => (
    <nav>
        <ul className="header-nav-bar">
            {props.tabs.map((tab, index) => (
                <li key={`${tab.label}-${index}`} className={tab.float ? tab.float : ""}>
                    <NavLink activeClassName="active" exact={tab.exact} to={tab.path} onClick={tab.onClick}>
                        {tab.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
);