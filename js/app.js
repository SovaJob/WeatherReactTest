'use strict';

//var React = require('React');
import React, { Component } from 'react';

import MainScreen from './containers/Main';

import Navigator from './navigator';

import {AppState, StyleSheet, View, StatusBar} from 'react-native';

var { connect } = require('react-redux');

export default class App extends React.Component{



    render() {
        return (
            <View style={styles.container}>

                <Navigator />
            </View>
        );
    }

};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});

function select(store) {
    return {
        isLoggedIn: true,
    };
}


module.exports = connect(select)(App);