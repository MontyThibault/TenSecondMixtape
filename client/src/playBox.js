import React from 'react';

import ClipTable from './clipTable.js';
import PlayControls from './playControls.js';

import PropTypes from 'prop-types';


export default class PlayBox extends React.Component {

	constructor(props) {
		super(props);


		this.state = {

			playing: false,
			volume: 1

		};
	}


	togglePlay() {

		this.setState({
			playing: !this.state.playing
		});

	}


	changeVolume(v) {

		this.setState({
			volume: v
		});

	}


	render() {

		return (

			<div className="now-playing">

				<div className="left-column">
					<div className="text"><h4>Now Playing</h4></div>

					<PlayControls
						onPlayChange={ this.props.onPlayChange }
						onVolumeChange={ this.props.onVolumeChange }
					/>
				</div>

				<div className="right-column">

					<ClipTable clip={ this.props.clip } reduced />
				
				</div>  

			</div>


		);

	}

}


PlayBox.propTypes = {

	clip: PropTypes.any.isRequired

};