import React from 'react';

import ClipTable from './clipTable.js';

import { connect } from 'react-redux';


class NowPlaying extends React.Component {

	render() {

		return (

			<div className="now-playing">

				<div className="left-column">
					<div className="text"><h4>Now Playing</h4></div>
					<div className="controls">


						{ /* Play/pause button */ }
						<i className={ this.props.playing ? "fa fa-play" : "fa fa-pause" } 

							onClick={ this.props.onPlayToggle }

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
				</div>

				<div className="right-column">

					<ClipTable clip={ this.props.clip } reduced />
				
				</div>  

			</div>


		);

	}

}


function mapStateToProps(state) {

	var clip;

	if(state.np.activeClip === 0) {

		clip = {

			title: "No clip",
			description: 'No description',
			author: 'No Author',
			timestamp: ' '

		};

	} else {

		clip = state.hist[state.np.activeClip];

	}


	return {

		clip: clip,
		playing: state.np.playing,
		volume: state.np.volume

	};

}


function mapDispatchToProps(dispatch) {

	return {

		onPlayToggle: () => { 
			dispatch(actions.TogglePlaying());
		},

		onVolumeChange: (val) => {

			// We can do a log volume thing here

			dispatch(actions.SetVolume(val));
		}

	};

}


NowPlaying = connect(mapStateToProps, mapDispatchToProps)(NowPlaying);




const initialState = {

	playing: false,
	activeClip: 0,
	activePosition: 0,
	volume: 1

};


const np = (state = initialState, action) => {	

	var st = Object.assign({}, state);


	if(action.type === 'Toggle Playing') {

		st.playing = !st.playing;

	} else if(action.type === 'Set Clip') {

		st.activeClip = action.timestamp;

	} else if(action.type === 'Set Active Position') {

		st.activePosition = action.val;

	} else if(action.type === 'Set Volume') {

		st.volume = action.val;

	}


	return st;

};



const actions = {

	TogglePlaying: () => ({
		type: 'Toggle Playing'
	}),

	SetClip: (ts) => ({
		type: 'Set Clip',
		timestamp: ts
	}),

	SetActivePosition: (val) => ({
		type: 'Set Active Position',
		val
	}),

	SetVolume: (val) => ({
		type: 'Set Volume',
		val
	})

};


export {

	NowPlaying,
	np, 
	actions

};