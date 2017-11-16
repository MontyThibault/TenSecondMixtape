import React from 'react';

import ReactCanvas from './canvas.js';
import PlayControls from './playControls.js';
import WebAudioPlayer from './webAudioPlayer.js';
import ClipInformation from './clipInformation.js';


export default class ClipCropper extends React.Component {

	constructor(props) {

		super(props);


		this.wap = new WebAudioPlayer(this.props.buffer);
		this.wap.onProgress = this.onProgress.bind(this);
		this.wap.onEnd = this.onEnd.bind(this);

		this.state = {
			progress: [0, 0],
			cropBoundaries: [0, 0],
			cropSet: false,
			cropBuffer: [],
			playing: false,
			volume: 1
		};


		this.seconds = 10;


	}


	onProgress(time, duration) {

		if(this.state.cropSet) {

			this.setState({
				progress: [this.state.cropBoundaries[0], 
					(time / duration) - this.state.cropBoundaries[0]]
			});

		} else {

			this.setState({
				progress: [0, time / duration]
			});

		}

	}


	onEnd() {

		this.setState({
			playing: false
		});

	}


	onScrub(e) {

		var start = e.relX / e.width,
			width = this.seconds / this.props.buffer.duration;


		if(start + width > 1) {

			width = 1 - start;
		
		}


		var cb = this.createCropBuffer([start, width]);


		this.setState({

			cropBoundaries: [start, width],
			cropSet: true,
			cropBuffer: cb
	
		}, function() {

			this.wap.scrub(start, this.seconds);

		});

	}


	togglePlay() {

		this.setState({

			playing: !this.state.playing

		}, function() {

			if(this.state.cropSet && this.state.playing) {

				// Play only until end of cropping

				this.wap.scrub(this.state.cropBoundaries[0], this.seconds);


			}


			var length = this.state.cropSet ? this.seconds : undefined;

			this.wap.playChange(this.state.playing, length);


		}.bind(this));


	}


	changeVolume(v) {

		if(v == this.state.v) {
			return;
		}

		this.setState({

			volume: v

		}, function() {

			this.wap.volumeChange(this.state.volume);

		}.bind(this));

	}


	componentWillUnmount() {

		this.wap.playChange(false);

	}


	createCropBuffer(cropBoundaries) {

		var array = this.props.buffer.getChannelData(0);

		var startInd = Math.floor(this.props.buffer.length * cropBoundaries[0]);


		if(cropBoundaries[0] + cropBoundaries[1] == 1) {

			return array.subarray(startInd);

		} else {

			var endInd = Math.floor(this.props.buffer.length * (cropBoundaries[0] + cropBoundaries[1]));

			return array.subarray(startInd, endInd);

		}

	}


	render() {

		return (
			<div>
				<hr/>

				<div className='item-circle'>2</div>

				<h3>Crop your clip.</h3>

				<ReactCanvas
					buffer={ this.props.buffer.getChannelData(0) }
					max_length={ this.props.buffer.length }
					oversample={ 5 }
					progress={ this.state.progress }
					progress2={ this.state.cropBoundaries }
					showProgress2={ true }
					onClick={ this.onScrub.bind(this) }
				/>

				<PlayControls 
					playing={ this.state.playing }
					volume={ this.state.volume }
					onPlayChange={ this.togglePlay.bind(this) }
					onVolumeChange={ this.changeVolume.bind(this) }
				/>


				{

					this.state.cropSet ?
						<ClipInformation
							buffer={ this.state.cropBuffer }
						/> : ''

				}

			</div>
		);

	}

}