import React from 'react';

import { Link } from 'react-router-dom';
import Streamer from '../streamer.js';
import HistoryList from '../reusable/historyList.js';


export default class Listen extends React.Component {

	constructor(props) {

		super(props);


		this.state = {
			showHistory: false
		};

	}


	render() {

		return (

			<div>
				<Streamer/>

				<div className='history'>

        			<button 
        				className='grey-shadow'
        				onClick={ () => this.setState({
        					showHistory: true	
        				}) }
        				style={{
        					display: this.state.showHistory ? 'none' : 'block'
        				}}
        			>Show History</button>

        			{
        				this.state.showHistory ?
	        				<HistoryList 
		        				reference='recent' 
		        				direction='past' 
		        				heading={
		        					<div>
										<h3>History</h3>
        								<span>(<Link to='upload'><span className="submit-clip">submit clip</span></Link>)</span>
		        					</div>
		        				}
		        			/> : ''
        			}
        			

				</div>
			</div>

		);

	}

}