import React from 'react';

import ClipTable from './clipTable.js';

import { connect } from 'react-redux';


class HistoryList extends React.Component {

	render() {

		let clips = Object.values(this.props.clips).map((c) => (

			<div className='history-item' key={c.timestamp}>
				<ClipTable clip={c} reduced />
			</div>

		));


		return (

			<div className="history-columns">
				{ clips }	
			</div>

		);

	}

}



function mapStateToProps(state) {

	return {
		clips: state.hist
	}

}


HistoryList = connect(mapStateToProps, () => ({}))(HistoryList);




const hist = (state = {}, action) => {

	if(action.type === 'Add Clip') {

		state[action.clip.timestamp] = action.clip;

	}


	return state;

};


const actions = {

	AddClip: (clip) => ({
		type: 'Add Clip',
		clip: clip
	})

};


export { HistoryList, hist, actions };