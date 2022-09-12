import React from 'react';

import ClipTable from './clipTable.js';
import MediaPlayer from './mediaPlayer.js';
import { HistoryList } from './historyList.js';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import 'isomorphic-fetch';


class Detail extends React.Component {

	constructor(props) {

		super(props);

		this.props.FetchClip(this.props.match.params.id);

	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.match.params.id != this.props.match.params.id) {

			this.props.FetchClip(nextProps.match.params.id);

		}

	}


	render() {

		return (

			<div className='detail'>
				<h3>Information for <span>{ this.props.match.params.id }</span></h3>

				<MediaPlayer/>

				<div className='clip-item'>
					{
					
					this.props.clip ?
						<ClipTable clip={ this.props.clip } />
						: ''

					}
				</div>

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


function mapStateToProps(state) {

	return {
		clip: state.detail.clip
	};

}


function mapDispatchToProps(dispatch) {

	return {
		FetchClip: (ref) => dispatch(actions.FetchClip(ref))
	}

}


Detail = connect(mapStateToProps, mapDispatchToProps)(Detail);




const initialState = {

	reference: '',
	status: '',
	clip: {}

};


const detail = (state = initialState, action) => {

	var st = Object.assign({}, state);


	if(action.type === 'Fetch Clip Start') {

		st.reference = action.reference;
		st.fetchStatus = 'Fetching';

	} else if(action.type === 'Fetch Clip Error') {

		st.fetchStatus = 'Error';

	} else if(action.type === 'Fetch Clip Recieve') {

		st.clip = action.json;
		st.fetchStatus = 'Recieved';

	}


	return st;

};




const actions = {

	FetchClip: (reference) => {

		return function(dispatch) {

			dispatch(actions._FetchClipStart(reference));


			return fetch('/api/clip/' + reference)
				.then(

					response => response.json(),
					error => {
						console.log('Clip fetch error occured.', error);
						dispatch(actions._FetchClipError(error));
					}

				).then(json =>
					dispatch(actions._FetchClipRecieve(reference, json.data))
				);

		}

	},


	_FetchClipStart: (reference) => ({
		type: "Fetch Clip Start",
		reference
	}),

	_FetchClipRecieve: (reference, json) => ({
		type: "Fetch Clip Recieve",
		json,
		reference
	}),

	_FetchClipError: (error) => {
		type: "Fetch Clip Error",
		error
	}


};


export { Detail, detail, actions };