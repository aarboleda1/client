import React from 'react';
import {Button, View} from 'react-native';
import { Components } from 'exponent';

export default class MapScreen extends React.Component {
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

	_goBack() {
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
			  	onPress={this._goBack.bind(this)}
			  	style={{paddingTop: 15}}
			  />
			</Components.MapView>
			);

	}
}