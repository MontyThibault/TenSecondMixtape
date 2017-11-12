import React from 'react';

export default class Listen extends React.Component {

	render() {

		return (

			<div className="upload">

				<h3>Choose your upload method.</h3>

				<div className="upload-methods">
					<div className="fs">
						<i className="fa fa-laptop" aria-hidden="true"></i>
					</div>
					<div className="yt">
						<i className="fa fa-youtube" aria-hidden="true"></i>
					</div>
					<div className="mic">
						<i className="fa fa-microphone" aria-hidden="true"></i>
					</div>
				</div>

			</div>

		);

	}

}