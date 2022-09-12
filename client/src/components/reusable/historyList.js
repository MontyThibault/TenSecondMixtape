import React from 'react';
import PropTypes from 'prop-types';

import ClipTable from './clipTable.js';
import ReactCanvas from './canvas.js';

import 'isomorphic-fetch';


export default class HistoryList extends React.Component {

	constructor(props) {

		super(props);


		this.state = {

			clips: [],

			fetch: {

				more: true,
				status: ''

			}

		};

	}


	componentDidUpdate(prevProps, prevState) {

		// New clip navigation from detail menu

		if(this.props.reference != prevProps.reference) {

			this.setState({

				clips: [],
				fetch: {

					more: true,
					status: ''

				}

			}, () => {

				this.loadMore(this.props.count);

			});

		}

	}


	componentDidMount() {

		this.loadMore(this.props.count);

	}


	loadMore(count) {

		count = count || 4;


		if(this.state.fetch.status != '') {

			console.log('Fetch busy or failed.');
			return;
		
		}

		if(this.state.clips.length) {

			var ref = this.state.clips[this.state.clips.length - 1]._id;

		} else {

			var ref = this.props.reference;

		}


		this.setState({ fetch: { status: 'Fetching' }});


		fetch(`/api/history/${ ref }/${ this.props.direction }/${ count }`)
		.then(

			response => response.json(),
			error => {

				console.log('Hist fetch error occured.', error);
				this.setState({ fetch: { status: 'Error' }});


			}

		).then(json => {

			if(json.type == 'Error') {

				console.log('Hist fetch error occured');
				return;

			}

			this.setState({ 

				clips: this.state.clips.concat(json.data),

				fetch: { 

					status: '',
					more: json.more

				}

			});

		});

	}


	render() {

		var clips = this.state.clips.map(k => (

			<div className='history-item grey-shadow' key={k._id}>
				
				<ClipTable clip={ k } reduced />
				<div><i className="fa fa-long-arrow-right" aria-hidden="true" /></div>
				
				<ReactCanvas
					showProgress={ false }
					showShine={ true }
					oversample={ 1 }
					buffer={ k.reducedAudio }
					max_length={ k.reducedAudio.length }
				/>

			</div>

		));


		return (

			<div>

				{ this.props.heading }

				<div className='history-columns'>
					<div>

						{ clips }	

						<div>
							<button className='grey-shadow' 
							style={{
								display: (this.state.fetch.more && this.state.fetch.status == '') ? 'inline' : 'none'
							}}
							onClick={ this.loadMore.bind(this, 4) }>

								Load More

							</button>

							<div className='spinner' style={{
								display: this.state.fetch.status == "Fetching" ? 'block' : 'none'
							}}></div>


							<button className='empty grey-shadow' disabled style={{
								display: (this.state.fetch.status == '' && !this.state.fetch.more) ?
									'inline' : 'none'
							}}>

								End of list. <i className="fa fa-music" aria-hidden="true"></i>

							</button>
						</div>

					</div>		
				</div>

			</div>

		);

	}

}


HistoryList.propTypes = {

	reference: PropTypes.string.isRequired,
	direction: PropTypes.oneOf(['future', 'past'])

};