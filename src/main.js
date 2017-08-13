"use strict";

/**
 * This is the entry point for the webpack bundle.
 *
 * Import any libraries needed across the whole application. Define navigation
 * routes and import the top-level component for each route.
 */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import history from './history.js';
import Purchase from './components/purchase/Purchase.js';
import HomePage from './components/home/HomePage.js';
import AboutPage from './components/about/AboutPage.js';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

//Render the React Router to navigate through components
render(
  <Router history={hashHistory}>
    <Route path="/" component={HomePage} />
    <Route path="purchase" component={Purchase} />
    <Route path="about" component={AboutPage} />
    <Redirect from="*" to="/" />
    <IndexRoute component={HomePage} />
  </Router>
, document.getElementById('app'));
