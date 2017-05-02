
'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    AppState,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux'
import MapView from 'react-native-maps';

import {
    POSITION,
    WEATHEROBJ
} from '../actions/types'


import { posChanged, } from '../actions/main_actions'
var Platform = require('Platform');


class Main extends Component {
    constructor(props) {
        super(props)
    }

    posChange(state){
      global.LOG("posChange");

      global.LOG("key target = " + JSON.stringify(state));

        const {dispatch} = this.props;
        dispatch(posChanged(state))
    }

    goNext(){
      global.LOG("this.props.pos = " + JSON.stringify(this.props.pos) );
      const {dispatch} = this.props;
      dispatch({
          type: WEATHEROBJ,
          weatherObj: false
      })
      Actions.second_screen();
      /*  if(this.props.email && this.props.password){
            Actions.second_screen()
        }else{
            alert('Enter Email and Password')
        }*/
    }

    watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        global.LOG("position = " + JSON.stringify(position));
        this.posChange(position)

      },
      (error) => global.LOG("pos error = " + JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      global.LOG("lastPosition = " + JSON.stringify(position));

    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

    render() {
        return (
            <ScrollView>
              <View style={styles.container}>
                <TouchableOpacity style={styles.next_button} onPress = {()=> this.goNext()}>
                    <Text style={styles.login_button_text}>Other city -></Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.info}> {JSON.stringify(this.props.weatherObj)}</Text>
              </View>
              <MapView
                style={styles.map}
                showsUserLocation={true}
                region={{
                  latitude:this.props.pos.coords? this.props.pos.coords.latitude : 47.8,
                  longitude: this.props.pos.coords? this.props.pos.coords.longitude : 35.1,
                  latitudeDelta: 0.2,
                  longitudeDelta: 0.2,
                }}
                onPress={(region)=>{this.posChange({coords: region.nativeEvent.coordinate})}}//TODO
                //onPress={this.posChange}
              >
              </MapView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        //backgroundColor: 'red',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    login_button_text: {
        color: '#fff'
    },
    back_button: {
        marginTop: 40
    },
    contentContainerStyle: {
        flex: 1,
    },
    email_input: {
        textAlign: "center",
        height: 40 * 1.2,
        fontSize: 14 * 1.2,
        marginBottom: 5,
        alignSelf: 'stretch'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#08a0d6'
    },
    next_button: {
        height: 40 * 1.2,
        width: 100,
        backgroundColor: '#01a4dd',
        alignSelf: 'stretch',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        },
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        marginTop: 5,
        marginLeft: 50,

    },
    login_email: {
        borderColor: '#8ec4ce',
    },
    map: {
      alignSelf: 'stretch',
      height:200
    },
    info: {
      height: 150 * 1.2,
      backgroundColor: '#CCCCCC',
      alignSelf: 'stretch',
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 3,
      shadowOffset: {
          height: 1,
          width: 0
    }
}
});

function mapStateToProps(store) {
    const { pos, weatherObj} = store.main;
    return {
        pos,
        weatherObj
    }
}

export default connect(mapStateToProps)(Main)
