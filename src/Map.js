/* eslint-disable no-undef */

import React, { Component } from 'react';
import './Map.css';

class Map extends Component {
	constructor(props) {
		super(props);

		this.APIkey = process.env.GMAP_KEY;
		this.props = props;
		this.initMap = this.initMap.bind(this);
		this.getCoordinates = this.getCoordinates.bind(this);
	}

	componentWillMount() {
		// Connect the initMap() function within this class to the global 
		// window context, so Google Maps can invoke it
		window.initMap = this.initMap;

		// Asynchronously load the Google Maps script, passing in the 
		// callback reference
		this.loadJS('https://maps.googleapis.com/maps/api/js?key=' + this.APIkey + '&callback=initMap')
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.place) {
			this.getCoordinates(nextProps.place);
		}
	}

    initMap() {
       	this.googleMap = new google.maps.Map(this.refs.map, {
			center: {
				lat: this.props.latitude,
				lng: this.props.longitude
			},
			zoom: this.props.zoom
        });

		this.geocoder = new google.maps.Geocoder();
    }

    getCoordinates(address) {
		this.geocoder.geocode({ address }, (results, status) => {
			if (status === google.maps.GeocoderStatus.OK) {
				console.log(results[0].geometry.location);

				if (this.marker) {
					this.marker.setMap(null);
				}

				this.marker = new google.maps.Marker({
					map: this.googleMap,
					position: results[0].geometry.location
				});

			} else {
				alert("Geocode unsuccessful");
			}
		});    	
    }

    setMapCenter(latitude, longitude) {
    	let location = 
		this.googleMap.setCenter(results[0].geometry.location);
    }

	loadJS(src) {
		let ref = window.document.getElementsByTagName("script")[0];
		let script = window.document.createElement("script");
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
	}

	render() {
		return (
			<div className="Map" id="map" ref="map"></div>
		);
	}	
}

export default Map;
