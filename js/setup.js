'use strict';

import React, { Component } from 'react';

import { Provider } from 'react-redux';

import App from './app';

import {Actions} from 'react-native-router-flux';

import configureStore from './store/configureStore'

import { AsyncStorage, AppState, Linking } from 'react-native';







export default class Root extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            store: configureStore(),
        };
    }


    render() {

        return (
            <Provider store={this.state.store}>
                <App />
            </Provider>
        );
    }
}


global.LOG = (...args) => {
    console.log('/------------------------------\\');
    console.log(...args);
    console.log('\\------------------------------/');
    return args[args.length - 1];
};
