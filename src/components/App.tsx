import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import "@Style/style.scss";
import "@Style/variables.scss";

import { NavBar } from "./shared";
import { SuspenseLoader, ErrorBoundary } from "./utilities";
import { MainRoutes, navTabs } from './Routes';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Router>
          <header>
            <NavBar tabs={navTabs} />
          </header>
          <main id="main-container">
            <React.Suspense fallback={<SuspenseLoader />}>
              <MainRoutes />
            </React.Suspense>
          </main>
        </Router>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default App;