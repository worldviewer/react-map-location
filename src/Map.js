/* eslint-disable no-undef */

import React, { Component } from 'react';
import './Map.css';
import _ from 'lodash';

class Map extends Component {
	constructor(props) {
		super(props);

		// Key is referrer restricted to
		// https://worldviewer.github.io/react-map-location/
		this.APIkey = 'AIzaSyDwtT6k0iFxxUDIg0CdaHtS6U_eegLV5DE';

		this.props = props;
		this.initMap = this.initMap.bind(this);
		this.initList = this.initList.bind(this);
		this.getCoordinates = this.getCoordinates.bind(this);
		this.panHandler = this.panHandler.bind(this);
	}

	componentWillMount() {
		// Connect the initMap() function within this class to the global 
		// window context, so Google Maps can invoke it
		window.initMap = this.initMap;

		// Asynchronously load the Google Maps script, passing in the 
		// callback reference
		this.loadJS('https://maps.googleapis.com/maps/api/js?key=' + this.APIkey + '&callback=initMap&libraries=geometry')
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active && !this.props.active) {
			this.getCoordinates(nextProps.active)
				.then(coordinates => {
					this.googleMap.panTo(coordinates);
					this.props.unsetNearestPlaceHandler();
				})
				.catch((err) => {
					console.log(err);
				})
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

		let panHandler = _.debounce(e => {
			this.panHandler();
		}, 400);

		this.googleMap.addListener('center_changed', panHandler);

		this.initList();
    }

    panHandler() {
		let distances = [];

		this.props.unsetExactPlaceHandler();

		let promiseArray = this.props.places.map(place => {
			return new Promise((resolve, reject) => {

				resolve(distances.push({
					name: place.name,
					distance: google.maps.geometry.spherical.computeDistanceBetween(this.googleMap.getCenter(), place.coordinates)
				}));

			});
		});

		Promise.all(promiseArray)
			.then(() => {
				distances.sort((a, b) => a.distance - b.distance);
				this.props.setNearestPlaceHandler(distances[0].name);
			})
			.catch((err) => {
				console.log(err);
			});
    }

    initList() {
    	let places = [];

    	let promiseArray = this.props.places.map(place => {
    		return new Promise((resolve, reject) => {
				this.geocoder.geocode({ address: place.name }, (results, status) => {
					if (status === google.maps.GeocoderStatus.OK) {

						resolve(places.push({
							name: place.name,
							coordinates: results[0].geometry.location
						}));

					} else {
						reject('Geocode unsuccessful during initialization of places.');
					}
				});    			
    		});
    	});

    	Promise.all(promiseArray)
    		.then(() => {
    			this.props.setPlaceCoordinatesHandler(places);
    		});
    }

    getCoordinates(address) {
    	return new Promise((resolve, reject) => {
			this.geocoder.geocode({ address }, (results, status) => {
				if (status === google.maps.GeocoderStatus.OK) {
					if (this.marker) {
						this.marker.setMap(null);
					}

					this.marker = new google.maps.Marker({
						map: this.googleMap,
						position: results[0].geometry.location
					});

					resolve(results[0].geometry.location);
				} else {
					reject('Geocode unsuccessful during distance calculation.');
				}
			});
    	})
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
