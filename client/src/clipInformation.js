import React from 'react';

import { Redirect } from 'react-router-dom';


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



		debugger;


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
				description,
				buffer: this.props.buffer

			})

		}).then(function(response) {

			return response.json();

		}).then(function(body) {

			console.log(body);

			if(body.type == 'Success') {

				this.setState({ redirect: true });

			}

		});

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