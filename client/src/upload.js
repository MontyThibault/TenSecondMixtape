import React from 'react';

import fetch from 'isomorphic-fetch';


export default class Listen extends React.Component {


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


	render() {

		return (

			<div className="upload">

				<div className='item-circle'>1</div>

				<h3>Choose your upload method.</h3>

				<div className="upload-methods">
					<div className="grey-shadow fs">
						<i className="fa fa-laptop" aria-hidden="true"></i>
					</div>
					<div className="grey-shadow yt">
						<i className="fa fa-youtube" aria-hidden="true"></i>
					</div>
					<div className="grey-shadow mic">
						<i className="fa fa-microphone" aria-hidden="true"></i>
					</div>
				</div>



				<hr/>

				<div className='item-circle'>2</div>

				<h3>Crop your clip.</h3>



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