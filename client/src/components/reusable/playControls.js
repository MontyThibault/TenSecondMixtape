import React from 'react';

import PropTypes from 'prop-types';


export default class PlayControls extends React.Component {

	render() {

		return (

			<div className="controls">


				{ /* Play/pause button */ }
				<i className={ this.props.playing ? "fa fa-pause" : "fa fa-play" } 
					onClick={ this.props.onPlayChange }
					style={{ width: '45px'}}
					aria-hidden="true"></i>


				{ /* Volume button */ }
				<i className={

					this.props.volume > 0.66 ? "fa fa-volume-up" :
					(this.props.volume > 0.33 ? "fa fa-volume-down" : "fa fa-volume-off")

				} aria-hidden="true" style={{ width: '45px' }}></i>

				<input type="range" 
					min='0' max='1' step='0.01'
					value={ this.props.volume } 
					onChange={ (e) => this.props.onVolumeChange(e.target.value) }
					/>

			</div>

		);

	}

}