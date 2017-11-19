import React from 'react';

import ClipTable from './clipTable.js';
import PlayControls from './playControls.js';

import PropTypes from 'prop-types';


export default class PlayBox extends React.Component {

	render() {

		return (

			<div className="now-playing">

				<div className="left-column">
					<div className="text"><h4>Now Playing</h4></div>

					<PlayControls
						playing={ this.props.playing }
						volume={ this.props.volume }
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