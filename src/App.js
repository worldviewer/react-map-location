import React, { Component } from 'react';
import './App.css';
import Map from './Map';

class App extends Component {
	constructor() {
		super();

		this.state = {
			map: {
				lat: -34.397,
				lng: 150.644,
				zoom: 8
			}
		}
	}

	render() {
		return (
			<div className="App">
				<Map
					lat={this.state.map.lat}
					lng={this.state.map.lng}
					zoom={this.state.map.zoom} />
			</div>
		);
	}
}

export default App;
