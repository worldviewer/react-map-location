import React, { Component } from 'react';

class List extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	render() {
		return (
			<ul>
				{this.props.places.map((place, i) => (
					<li key={i}>{place}</li>
				))}
			</ul>
		);
	}
}

export default List;
