import React from 'react';

import fetch from 'isomorphic-fetch';

import getAudio from './audioAPI.js';
import MicModal from './micModal.js';
import ClipCropper from './clipCropper.js';


export default class Upload extends React.Component {

	constructor(props) {

		super(props);

		this.state = {

			showMicModal: false,
			showCropper: false

		};


		this.audioEl = document.createElement('audio');

	}


	onSubmit(e) {

		e.preventDefault();


		if(this.title.value === '') {

			alert('Title required');
			return;

		}


		var author = this.author.value || 'Anonymous',
			description = this.description.value || 'No Description';


		fetch('/api/submit', {

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},

			method: 'POST',
			
			body: JSON.stringify({

				title: this.title.value,
				author,
				description

			})

		}).then(function(response) {

			return response.json();

		}).then(function(body) {

			console.log(body);

		});

	}


	micInput() {

		this.setState({ showMicModal: true });

	}


	fileInput() {

		var fileInput = document.createElement('input');
		fileInput.type = 'file';

		fileInput.onchange = function() {

			var URL = window.URL || window.webkitURL;

			var file = fileInput.files[0],
				fileURL = URL.createObjectURL(file);

			this.generateBuffer(fileURL);

		}.bind(this);


		fileInput.click();

	}


	generateBuffer(src) {

		var ctx = getAudio();


		var _this = this;

		fetch(src).then(

			(res) => {

				return res.arrayBuffer()
			}

		).then(
			(res) => {

				ctx.decodeAudioData(res, function(buffer) {

					_this.buffer = buffer;
					_this.setState({ showCropper: true });

				});

			}
		);

	}


	youtubeInput() {



	}


	render() {

		return (

			<div className="upload">

				<div className='item-circle'>1</div>

				<h3>Choose your upload method.</h3>

				<div className="upload-methods">
					<div className="grey-shadow fs" onClick={

						this.fileInput.bind(this)

					}>
						<i className="fa fa-laptop" aria-hidden="true"></i>
					</div>
					<div className="grey-shadow yt" onClick={

						this.youtubeInput.bind(this)

					}>
						<i className="fa fa-youtube" aria-hidden="true"></i>
					</div>
					<div className="grey-shadow mic" onClick={

						() => this.setState({ showMicModal: true })

					}>
						<i className="fa fa-microphone" aria-hidden="true"></i>
					</div>
				</div>


				{ this.state.showMicModal ? <MicModal generateBuffer={

					this.generateBuffer.bind(this)

				} close={

					() => this.setState({ showMicModal: false })

				}/> : '' }


				<hr/>

				<div className='item-circle'>2</div>

				<h3>Crop your clip.</h3>

				{
					this.state.showCropper ? 
						<ClipCropper 
							buffer={ this.buffer }
							

							// Force reload when the user submits a 
							// different source

							key={ new Date().getTime() }
						/> : ''
				}


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

			</div>

		);

	}

}