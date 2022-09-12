import React from 'react';

import ClipTable from './clipTable.js';
import MediaPlayer from './mediaPlayer.js';
import HistoryList from './historyList.js';

import { Link } from 'react-router-dom';

import 'isomorphic-fetch';


export default class Detail extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			clip: undefined,
			fetch: {
				status: ''
			}
		};

	}


	componentWillReceiveProps(nextProps) {

		if(nextProps.match.params.id != this.props.match.params.id) {

			this.fetchClip(nextProps.match.params.id);

		}

	}


	componentDidMount() {

		this.fetchClip(this.props.match.params.id);

	}


	fetchClip(ref) {

		if(this.state.fetch.status != '') {

			console.log('Fetch busy or failed.');
			return;
		
		}


		this.setState({ fetch: { status: 'Fetching' }});


		fetch(`/api/clip/${ ref }`).then(

			response => response.json(),
			error => {

				console.log('Clip fetch error occured.', error);
				this.setState({ fetch: { status: 'Error' }});


			}

		).then(json => {

			if(json.type == 'Error') {

				console.log('Server error: ', json.description);
				return;

			}

			this.setState({ 

				clip: json.data,
				fetch: { 
					status: '',
				}

			});
		});

	}


	render() {

		return (

			<div className='detail'>
				<h3>Information for <span>{ this.props.match.params.id }</span></h3>

				<div className='spinner' style={{
					display: this.state.fetch.status == "Fetching" ? 'block' : 'none'
				}}></div>

				{ this.state.clip ?	<MediaPlayer clip={ this.state.clip }/> : '' }


				<div className='prev-next'>
					<div>
						<h3>Previous</h3>
						<HistoryList reference={ this.props.match.params.id } direction='past' count='2'/>
					</div>
					<div>
						<h3>Future</h3>
						<HistoryList reference={ this.props.match.params.id } direction='future' count='2'/>
					</div>
				</div>
			</div>

		);

	}

}