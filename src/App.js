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
				zoom: 2
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
	}

	render() {
		return (
			<div className="App">
				<List
					places={this.state.places} />
				<Map
					latitude={this.state.map.lat}
					longitude={this.state.map.lng}
					zoom={this.state.map.zoom} />
			</div>
		);
	}
}

export default App;
