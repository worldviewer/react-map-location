/* eslint-disable no-undef */

import React, { Component } from 'react';

class Map extends Component {
	constructor(props) {
		super(props);

		this.APIkey = process.env.GMAP_KEY;
		this.props = props;
		this.initMap = this.initMap.bind(this);
	}

	componentWillMount() {
		// Connect the initMap() function within this class to the global 
		// window context, so Google Maps can invoke it
		window.initMap = this.initMap;

		// Asynchronously load the Google Maps script, passing in the 
		// callback reference
		this.loadJS('https://maps.googleapis.com/maps/api/js?key=' + this.APIkey + '&callback=initMap')
	}

    initMap() {
       	this.googleMap = new google.maps.Map(this.refs.map, {
			center: {
				lat: this.props.lat,
				lng: this.props.lng
			},
			zoom: this.props.zoom
        });
    }

	loadJS(src) {
		let ref = window.document.getElementsByTagName("script")[0];
		let script = window.document.createElement("script");
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
	}

	render() {
		const mapStyles = {
			height: '500px',
			width: '500px'
		};

		return (
			<div id="map"
				ref="map"
				style={mapStyles}></div>
		);
	}	
}

export default Map;
