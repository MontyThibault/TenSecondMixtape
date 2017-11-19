import React from 'react';

import MediaPlayer from './reusable/mediaPlayer.js';


export default class Streamer extends React.Component {

	render() {

		return (

			<MediaPlayer clip={{

				title: "Streamer not working yet",
				description: "All hail Hitler",
				author: "Hitler",

				fullAudio: 'histler'

			}} />

		);

	}

}