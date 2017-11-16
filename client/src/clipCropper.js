import React from 'react';

import ReactCanvas from './canvas.js';
import PlayControls from './playControls.js';
import WebAudioPlayer from './webAudioPlayer.js';


export default class ClipCropper extends React.Component {

	constructor(props) {

		super(props);


		this.wap = new WebAudioPlayer(this.props.buffer);
		this.wap.onProgress = this.onProgress.bind(this);
		this.wap.onEnd = this.onEnd.bind(this);

		this.state = {
			progress: [0, 0],
			playing: false,
			volume: 1
		};


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

	}


	onScrub(e) {

		this.wap.scrub(e.relX / e.width)

	}


	togglePlay() {

		this.setState({

			playing: !this.state.playing

		}, function() {

			this.wap.playChange(this.state.playing);

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


	render() {

		return (
			<div>
				<ReactCanvas
					buffer={ this.props.buffer.getChannelData(0) }
					max_length={ this.props.buffer.length }
					oversample={ 5 }
					progress={ this.state.progress }
					onClick={ this.onScrub.bind(this) }
				/>

				<PlayControls 
					playing={ this.state.playing }
					volume={ this.state.volume }
					onPlayChange={ this.togglePlay.bind(this) }
					onVolumeChange={ this.changeVolume.bind(this) }
				/>



			</div>
		);

	}

}