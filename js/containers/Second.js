
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
    StatusBar
} from 'react-native';

import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux'
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import { posChanged, } from '../actions/main_actions'

class Second extends Component {
    constructor(props) {
        super(props)
    }

    posChange(state){
      global.LOG("posChange");

      global.LOG("posChange state = " + JSON.stringify(state));

        const {dispatch} = this.props;
        dispatch(posChanged(state))
    }

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.weatherObj) Actions.pop();
    }


    render() {
        return (
            <View style={{flex:1, flexDirection: "column"}}>
                <View >
                    <TouchableOpacity style={[styles.brick_button, styles.next_button]} onPress = {()=> Actions.pop()}>
                        <Text style={styles.login_button_text}>Go Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                  <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    listViewDisplayed='true'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={(row) => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                      console.log(data);
                      console.log(details);
                      this.posChange({coords: {latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}});
                    }}
                    onFail={(err)=>{console.log("onfail = " + err)}}
                    onNotFound={(err)=>{console.log("onNotFound = " + err)}}


                    getDefaultValue={() => {
                      return ''; // text input default value
                    }}
                    query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: 'AIzaSyDIVqPBUM0HmxJ-HNZDRaj4guZbOMKG4EU',
                      language: 'en', // language of the results
                      types: '(cities)', // default: 'geocode'
                    }}
                    styles={{
                      description: {
                        fontWeight: 'bold',
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                    }}

                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                      // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                      // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                      rankby: 'distance',
                      types: 'food',
                    }}


                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    
                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                    //renderRightButton={() => <Text>Custom text after the inputg</Text>}
                  />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column'
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
        backgroundColor: '#01a4dd',
        alignSelf: 'stretch',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    login_email: {
        borderColor: '#8ec4ce',
    },
    brick_button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        marginTop: 5
    }
});

function mapStateToProps(store) {
    const {pos, weatherObj} = store.main;
    return {
        pos,
        weatherObj
    }
}

export default connect(mapStateToProps)(Second)
