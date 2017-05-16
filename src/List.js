import React, { Component } from 'react';
import './List.css';

class List extends Component {
	constructor(props) {
		super(props);

		this.props = props;
		this.placeClickHandler = this.placeClickHandler.bind(this);
	}

	placeClickHandler(e) {
		let location = e.target.innerHTML;
		this.props.placeClickHandler(location);
	}

	render() {
		return (
			<ul className="List">
				{this.props.places.map((place, i) => (
					<li key={i}
						onClick={this.placeClickHandler}
						className="place">{place}</li>
				))}
			</ul>
		);
	}
}

export default List;
