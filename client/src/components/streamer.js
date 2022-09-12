import React from 'react';

import io from 'socket.io-client';

import MediaPlayer from './reusable/mediaPlayer.js';


export default class Streamer extends React.Component {

	constructor(props) {

		super(props);

		
		this.MAX_LENGTH = 10;

		this.clips = [];

		this.state = {

			connected: false,
			initialized: false,
			currentClip: {
				title: 'Not connected',
				description: '.',
				author: '.',
				fullAudio: ''
			}

		};



		this.socket = io();
		this.socket.on('connect', function() {

			this.setState({
				connected: true,
				initialized: true
			});

		}.bind(this));


		this.socket.on('disconnect', function() {

			this.setState({
				connected: false
			});

		}.bind(this));



		this.socket.on('clip', function(clip) {

			if(clip == null) {
				return;
			}


			console.log(clip);


			if(this.clips.length <= this.MAX_LENGTH) {

				this.clips.push(clip);


				if(this.state.currentClip.fullAudio == '') {

					// Autoplay

					this.nextClip();

				}

			} else {

				// Disconnect until queue is emptied again.

				console.log('Socket disconnected from inactivity.');
				this.socket.disconnect();

			}

		}.bind(this));

	}


	nextClip() {

		if(!this.socket.connected && this.clips.length < this.MAX_LENGTH - 3) {

			// Reconnect after period of inactivity

			console.log('Socket reconnected.');
			this.socket.connect();

		}


		if(this.clips.length == 0) {

			console.log('Clip queue empty!');
			return;

		}


		this.setState({
			currentClip: this.clips.shift()
		});

	}



	render() {

		return (

			<div>
				<div 
					className='spinner'
					style={{
						display: this.state.initialized ? 'none' : 'block'
					}}
				></div>

				<MediaPlayer 
					style={{
						display: this.state.initialized ? 'block' : 'none'
					}}
					clip={ this.state.currentClip }
					onEnd={ this.nextClip.bind(this) }
					autoPlay={ true }

				/>
			</div>

		);

	}

}