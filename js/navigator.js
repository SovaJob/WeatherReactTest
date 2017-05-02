'use strict';

import React, { Component } from 'react';

import { Platform, BackAndroid, Navigator, StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';

import MainScreen from './containers/Main';
import Second from './containers/Second';


import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux';


const scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        <Scene key="main" component={MainScreen} initial={true}/>
        <Scene key="second_screen" component={Second} />
      

    </Scene>
);


class AppNavigator extends React.Component{
    constructor(props){
        super(props);
    }

    /**
     * Lock native back button
     * @returns {boolean}
     */
    lockBackButton(){
        return true;
    }
    render() {
        return <Router
            onBackAndroid={this.lockBackButton}
            backAndroidHandler={this.lockBackButton}
            dispatch={this.props.dispatch} style={styles.container} scenes={scenes}/>
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    }
});


module.exports = AppNavigator;
