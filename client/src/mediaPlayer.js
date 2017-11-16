import React from 'react';

import PlayBox from './playBox.js';
import ReactCanvas from './canvas.js';

import PropTypes from 'prop-types';
import getAudio from './audioAPI.js';



// import React from 'react';

// import ReactCanvas from './canvas.js';
// import PlayControls from './playControls.js';
// import WebAudioPlayer from './webAudioPlayer.js';


// export default class ClipCropper extends React.Component {

// 	constructor(props) {

// 		super(props);


// 		this.wap = new WebAudioPlayer(this.props.buffer);
// 		this.wap.onProgress = this.onProgress.bind(this);
// 		this.wap.onEnd = this.onEnd.bind(this);

// 		this.state = {
// 			progress: [0, 0],
// 			playing: false,
// 			volume: 1
// 		};


// 	}


// 	onProgress(time, duration) {

// 		this.setState({
// 			progress: [0, time / duration]
// 		});

// 	}


// 	onEnd() {

// 		this.setState({
// 			playing: false
// 		});

// 	}


// 	onScrub(e) {

// 		this.wap.scrub(e.relX / e.width)

// 	}


// 	togglePlay() {

// 		this.setState({

// 			playing: !this.state.playing

// 		}, function() {

// 			this.wap.playChange(this.state.playing);

// 		}.bind(this));


// 	}


// 	changeVolume(v) {

// 		if(v == this.state.v) {
// 			return;
// 		}

// 		this.setState({

// 			volume: v

// 		}, function() {

// 			this.wap.volumeChange(this.state.volume);

// 		}.bind(this));

// 	}


// 	componentWillUnmount() {

// 		this.wap.playChange(false);

// 	}


// 	render() {

// 		return (
// 			<div>
// 				<ReactCanvas
// 					buffer={ this.props.buffer.getChannelData(0) }
// 					max_length={ this.props.buffer.length }
// 					oversample={ 5 }
// 					progress={ this.state.progress }
// 					onClick={ this.onScrub.bind(this) }
// 				/>

// 				<PlayControls 
// 					playing={ this.state.playing }
// 					volume={ this.state.volume }
// 					onPlayChange={ this.togglePlay.bind(this) }
// 					onVolumeChange={ this.changeVolume.bind(this) }
// 				/>



// 			</div>
// 		);

// 	}

// }



export default class MediaPlayer extends React.Component {


	constructor(props) {

		super(props);

		this.audioCtx = getAudio();


		var MAX_LENGTH = 30 * this.audioCtx.sampleRate;


		this.state = {

			buffer: new Float32Array(MAX_LENGTH),
			endPtr: 0

		};



		for(var i = 0; i < MAX_LENGTH; i++) {

			this.state.buffer[i] = Math.sin(i / (this.audioCtx.sampleRate * 1))

			this.state.buffer[i] += Math.random() - 0.5;

			this.state.buffer[i] /= 3;

		}

		this.state.endPtr = MAX_LENGTH - 1;

	}

	render() {

		return (

			<div>
				<ReactCanvas 
					buffer = { this.state.buffer }
					max_length= { this.state.endPtr }
					oversample={ 3 }
				/>

				<PlayBox 
					clip={ this.props.clip }
					onPlayChange={ () => {} }
					onVolumeChange={ () => {} }
				/>
			</div>
 
		);

	}

}

MediaPlayer.propTypes = {

	clip: PropTypes.any.isRequired
	
};