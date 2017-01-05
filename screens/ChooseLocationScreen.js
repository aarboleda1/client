import React from 'react';
import {Button, View} from 'react-native';
import { Components } from 'exponent';
import Router from '../navigation/Router';
import config from '../config';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');


export default class ChooseLocationScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Choose Location',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      latlng: {},
    };
  }


  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}

        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          // console.log(data);
          // console.log(details.geometry.location);
          let location = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          };
          this.props.navigator.push(Router.getRoute('map', {location: location}))

        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: config.googleAPIKey,
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

      />
    );
  } 
}