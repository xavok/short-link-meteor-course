/**
 * Created by Xavok on 4/5/2017.
 */
import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Router, Route, browserHistory } from 'react-router';

import Signup from '/imports/ui/Signup';
import Link from '/imports/ui/Link';
import NotFound from '/imports/ui/NotFound';
import Login from '/imports/ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
    if(Meteor.userId()) {
        browserHistory.replace('/links');
    }
};
const onEnterPrivatePage = () => {
    if(!Meteor.userId()) {
        browserHistory.replace('/');
    }
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    if(isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/links');
    } else if(isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    }
};

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" components={Login} onEnter={onEnterPublicPage} />
        <Route path="/signup" components={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/links" components={Link} onEnter={onEnterPrivatePage} />
        <Route path="*" components={NotFound} />
    </Router>
);
