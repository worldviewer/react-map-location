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
				"Hong Kong",
				"London, Great Britain",
				"San Francisco, CA",
				"Los Angeles, CA",
				"Anchorage, AK",
				"Amsterdam, Netherlands",
				"Barcelona, Spain",
				"Berlin, Germany",
				"Rio de Janeiro, Brazil",
				"Cape Town, South Africa"
			]
		}

		this.clickPlaceName = this.clickPlaceName.bind(this);
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

	render() {
		return (
			<div className="App">
				<List
					places={this.state.places}
					placeClickHandler={this.clickPlaceName} />
				<Map
					latitude={this.state.map.lat}
					longitude={this.state.map.lng}
					zoom={this.state.map.zoom}
					place={this.state.map.place} />
			</div>
		);
	}
}

export default App;
