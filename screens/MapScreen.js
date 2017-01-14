import React from 'react';
import {Button, View, StyleSheet, Text, TouchableHighlight, Dimensions } from 'react-native';
import { Components } from 'exponent';

import { connect } from 'react-redux';

import { setSearchLocation } from '../actions/searchActions';
import { clearMapContext } from '../actions/mapContextActions';

const contexts = {
	'search': setSearchLocation,
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    // paddingTop: 540,
    justifyContent: 'flex-end',
  },
  button: {
  	borderColor: '#05A5D1',
  	borderWidth: 2,
  	backgroundColor: '#333',
  	margin: 20,
  	height: WINDOW_HEIGHT / 7.5,
  	width: WINDOW_WIDTH / 1.1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	// flex: 1,
  	// flexDirection: 'column',
  },
  buttonText: {
  	color: '#FAFAFA',
  	// flex: 1,
  	fontSize: 21,
  	fontWeight: '500',
  	
  },
});

class MapScreen extends React.Component {

	constructor(props) {
		super(props);
		let location = this.props.route.params.location;
		this.state = {
	    region: {
	      latitude: location.latitude,
	      longitude: location.longitude,
	      latitudeDelta: 0.0922,
	      longitudeDelta: 0.0421,
	    },
		};
	}

	onRegionChange(region) {
		this.setState({ region });
	}

	_confirm() {
		let action = contexts[this.props.mapContext];
		this.props.dispatch(action.call(this, this.props.route.params.city));
		this.props.dispatch(clearMapContext());
		this.props.navigator.pop(2);
	}

  _confirm() {
    this.props.dispatch(setSearchLocation(this.props.route.params.city));
    this.props.navigator.pop(2);
  }
	
	render() {
		// const {height, width} = Dimensions.get('window');
		// let dynamicStyles = StyleSheet.create()
		var cords = {latitude: this.state.region.latitude, longitude: this.state.region.longitude}
		return (
			<Components.MapView
				style={styles.container}
				coordinate={cords}
		    region={this.state.region}
		    onRegionChange={this.onRegionChange.bind(this)}
		    >
			 <Components.MapView.Marker
			 		coordinate={cords}
			  />
		  	<TouchableHighlight
					title="Confirm Location"
					onPress={this._confirm.bind(this)}
					style={styles.button}>
					<Text style={styles.buttonText}>
						Confirm Location
					</Text>
				</TouchableHighlight>
			</Components.MapView>
			);
	}
}

function mapStateToProps(state) {
	return {
		location: state.location,
		mapContext: state.mapContext,
	}
}

export default connect(mapStateToProps)(MapScreen);