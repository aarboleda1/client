import React from 'react';
import {Button, View} from 'react-native';
import { Components } from 'exponent';

import { connect } from 'react-redux';

import { setSearchLocation } from '../actions/searchActions';

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
		this.props.dispatch(setSearchLocation(this.props.route.params.city));
		this.props.navigator.pop(2);
	}
	
	render() {
		var cords = {latitude: this.state.region.latitude, longitude: this.state.region.longitude}
		return (
			<Components.MapView
				coordinate={cords}
				style={{flex: 1}}
		    region={this.state.region}
		    onRegionChange={this.onRegionChange.bind(this)}
		    >

			 <Components.MapView.Marker
			 		coordinate={cords}
			  />
			  <Button
			  	title="Confirm Location"
			  	onPress={this._confirm.bind(this)}
			  	style={{paddingTop: 15}}
			  />
			</Components.MapView>
			);
	}
}

function mapStateToProps(state) {
	return {
		location: state.location,
	}
}

export default connect(mapStateToProps)(MapScreen);
