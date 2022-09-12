import React from 'react';

import { Link } from 'react-router-dom';

import MediaPlayer from './mediaPlayer.js';
import NowPlaying from './nowPlaying.js';
import HistoryList from './history.js';


export default class Listen extends React.Component {

	render() {

		return (

			<div>
				<MediaPlayer/>
				<NowPlaying/>

				<div className='history'>

					<h3>History</h3>
        			<span>(See <Link to='history'><span className="full-history">full history</span></Link> or <Link to='upload'><span className="submit-clip">submit clip</span></Link>)</span>

        			<HistoryList/>

				</div>
			</div>

		);

	}

}