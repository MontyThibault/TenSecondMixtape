import React from 'react';

import PlayBox from './playBox.js';
import ReactCanvas from './canvas.js';
import WebAudioPlayer from '../../webAudio/webAudioPlayer.js';

import PropTypes from 'prop-types';
import getAudio from '../../webAudio/audioAPI.js';



// Todo: consolidate this into base class that's extended
// by clipCropper and streamer. Maybe later.

export default class MediaPlayer extends React.Component {


	constructor(props) {

		super(props);

		this.state = {
			progress: [0, 0],
			playing: false,
			volume: 1,
			bufferLoaded: false,

			inTransition: false
		};


		if(this.props.clip.fullAudio != '') {

			this.decodeAudio(
				this.props.clip.fullAudio,
				this.bufferLoaded.bind(this));

		}

	}


	bufferLoaded(buffer) {

		this.buffer = buffer;

		this.wap = new WebAudioPlayer(this.buffer);
		this.wap.onProgress = this.onProgress.bind(this);
		this.wap.onEnd = this.onEnd.bind(this);


		this.setState({

			bufferLoaded: true

		});


		if(this.props.autoPlay) {
			this.togglePlay();
		}

	}


	transition(callback) {

		this.setState({
			inTransition: true
		});


		var ctx = getAudio();

		var ms = 100;

		this.buffer = ctx.createBuffer(1, ctx.sampleRate * ms / 1000, ctx.sampleRate);


		// Populate buffer with random noise

		var arr = this.buffer.getChannelData(0);

		for(var i = 0; i < arr.length; i++) {

			arr[i] = Math.random() * 2 - 1;


			// A little nicer on the ears

			arr[i] *= 0.2;

		}


		this.wap = new WebAudioPlayer(this.buffer);
		this.wap.onEnd = callback;

		this.wap.playChange(true);

	}



	// Consolidate this in a module together with its
	// counterpart in clipInformation.js.

	decodeAudio(audioStr, callback) {

		// Trim off first 22 characters. (MIME type info)

		audioStr = audioStr.slice(22);

		var blob = this.b64toBlob(audioStr, 'audio/ogg');

		var blobURL = URL.createObjectURL(blob);

		this.generateBuffer(blobURL, callback);

	}



	// This is duplicated from upload.js

	generateBuffer(src, callback) {

		var ctx = getAudio();


		fetch(src).then(

			(res) => {

				return res.arrayBuffer()
			}

		).then(
			(res) => {

				ctx.decodeAudioData(res, function(buffer) {

					buffer.timestamp = new Date().getTime();
					callback(buffer);

				});

			}
		);

	}


	// See https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript/16245768
	b64toBlob(b64Data, contentType, sliceSize) {

		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);

		}

		var blob = new Blob(byteArrays, {type: contentType});

		return blob;

	}


	onProgress(time, duration) {

		this.setState({
			progress: [0, time / duration]
		});

	}


	onEnd() {

		this.setState({
			playing: false
		});


		this.props.onEnd();

	}


	onScrub(e) {

		if(this.state.bufferLoaded) {

			this.wap.scrub(e.relX / e.width)

		}

	}


	togglePlay() {

		this.setState({

			playing: !this.state.playing

		}, function() {


			if(this.state.bufferLoaded) {

				this.wap.playChange(this.state.playing);

			}

		}.bind(this));


	}


	changeVolume(v) {

		if(v == this.state.v) {
			return;
		}

		this.setState({

			volume: v

		}, function() {

			if(this.state.bufferLoaded) {

				this.wap.volumeChange(this.state.volume);

			}

		}.bind(this));

	}


	componentWillUnmount() {

		if(this.state.bufferLoaded) {

			this.wap.playChange(false);

		}

	}


	componentWillReceiveProps(nextProps) {

		if(this.props.clip != nextProps.clip) {

			this.transition(function() {

				this.decodeAudio(
					nextProps.clip.fullAudio,
					this.bufferLoaded.bind(this));


				this.setState({
					inTransition: false
				});

		}.bind(this));

		}

	}


	render() {

		return (

			<div>
				<ReactCanvas
 					buffer={ this.state.bufferLoaded ? this.buffer.getChannelData(0) : [] }
 					max_length={ this.state.bufferLoaded ? this.buffer.length : 0 }
 					oversample={ 5 }
					progress={ this.state.progress }
					onClick={ this.onScrub.bind(this) }
					key={ this.state.bufferLoaded ? this.buffer.timestamp : '' }
 				/>

				<PlayBox 
					clip={ this.props.clip }
					playing={ this.state.playing }
					volume={ this.state.volume }
					onPlayChange={ this.togglePlay.bind(this) }
					onVolumeChange={ this.changeVolume.bind(this) }
				/>
			</div>
 
		);

	}

}


MediaPlayer.propTypes = {

	clip: PropTypes.any.isRequired
	
};


MediaPlayer.defaultProps = {

	onEnd: () => {},
	autoPlay: false

}