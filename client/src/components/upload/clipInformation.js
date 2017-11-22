import React from 'react';

import { Redirect } from 'react-router-dom';

import getAudio from '../../webAudio/audioAPI.js';


export default class ClipInformation extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			redirect: false

		};
	
	}


	onSubmit(e) {

		e.preventDefault();


		if(this.title.value === '') {

			alert('Title required');
			return;

		}


		var author = this.author.value || 'Anonymous',
			description = this.description.value || 'No Description';


		// Encode audio buffer to OGG

		var ctx = getAudio();

		var quality = 0.5;

		var encoder = new OggVorbisEncoder(ctx.sampleRate, 1, quality);
		encoder.encode([this.props.buffer]);
		var blob = encoder.finish();



		// Reduced version for clip visualization - only 400 samples
		// No compression

		var reducedAudio = new Array(400);

		for(var i = 0; i < reducedAudio.length; i++) {

			var ind = Math.floor((i / 400) * this.props.buffer.length);

			reducedAudio[i] = this.props.buffer[ind];

		}


		// Read encoder output as base-64 to embed in JSON

		var reader = new FileReader();
		reader.addEventListener('load', function() {

			fetch('/api/submit', {

				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},

				method: 'POST',
				
				body: JSON.stringify({

					title: this.title.value,
					author,
					description,
					duration: 10000,
					fullAudio: reader.result,
					reducedAudio

				})

			}).then(function(response) {

				return response.json();

			}, function(err) {

				console.log('Error', err);

			}).then(function(body) {

				console.log(body);

				if(body.type == 'Success') {

					this.setState({ redirect: true });

				}

			}.bind(this));

		}.bind(this));


		reader.readAsDataURL(blob);

	}


	render() {

		return (

			<div className='info'>
				<hr/>

				<div className='item-circle'>3</div>


				<h3>Give some information.</h3>

				<form onSubmit={ this.onSubmit.bind(this) }>
					<label className='title'>
						<span>Title: </span>
						<input type='text' ref={(i) => { this.title = i; }} placeholder="Required" />
					</label>
					<label className='author'>
						<span>Author: </span>
						<input type='text' ref={(i) => { this.author = i; }}  placeholder="Anonymous" />
					</label>
					<label className='description'>
						<span>Description: </span>
						<input type='text' ref={(i) => { this.description = i; }} placeholder="No Description" />
					</label>
					<input className='grey-shadow' type='submit' value='Submit'/>
				</form>


				{
					this.state.redirect ?
						<Redirect to='/' /> : ''
				}

			</div>

		);

	}

}