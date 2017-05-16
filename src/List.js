import React, { Component } from 'react';
import './List.css';

class List extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	render() {
		return (
			<ul className="List">
				{this.props.places.map((place, i) => (
					<li key={i}
						className="place">{place}</li>
				))}
			</ul>
		);
	}
}

export default List;
