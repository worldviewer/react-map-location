import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import List from './List';

class App extends Component {
	constructor() {
		super();

		this.state = {
			map: {
				lat: 37.7,
				lng: -158.2,
				zoom: 2,
				place: ''
			},
			places: [
				{ name: "Hong Kong", coordinates: null },
				{ name: "London, Great Britain", coodinates: null },
				{ name: "San Francisco, CA", coordinates: null },
				{ name: "Los Angeles, CA", coordinates: null },
				{ name: "Anchorage, AK", coordinates: null },
				{ name: "Amsterdam, Netherlands", coordinates: null },
				{ name: "Barcelona, Spain", coordinates: null },
				{ name: "Berlin, Germany", coordinates: null },
				{ name: "Rio de Janeiro, Brazil", coordinates: null },
				{ name: "Cape Town, South Africa", coordinates: null }
			]
		}

		this.clickPlaceName = this.clickPlaceName.bind(this);
		this.setPlaceCoordinates = this.setPlaceCoordinates.bind(this);
	}

	clickPlaceName(place) {
		console.log(place);

		this.setState({
			map: {
				...this.state.map,
				place
			}
		})
	}

	setPlaceCoordinates(places) {
		this.setState({
			places
		});
	}

	render() {
		return (
			<div className="App">
				<List
					places={this.state.places}
					placeClickHandler={this.clickPlaceName}
					active={this.state.map.place} />
				<Map
					places={this.state.places}
					latitude={this.state.map.lat}
					longitude={this.state.map.lng}
					zoom={this.state.map.zoom}
					active={this.state.map.place}
					setPlaceCoordinatesHandler={this.setPlaceCoordinates} />
			</div>
		);
	}
}

export default App;
