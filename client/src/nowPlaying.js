import React from 'react';

export default class NowPlaying extends React.Component {

	render() {

		return (

			<div className="now-playing">

				<div className="left-column">
					<div className="text"><h4>Now Playing</h4></div>
					<div className="controls">
						<i className="fa fa-play" aria-hidden="true"></i>
						<i className="fa fa-pause" aria-hidden="true"></i>

						<i className="fa fa-volume-up" aria-hidden="true"></i>

					</div>
				</div>

				<div className="right-column">
					<table className='clip-data'>
					<tbody>
						<tr>
							<th>Title</th>
							<td>My Sample Title</td>
						</tr>
						<tr>
							<th>Description</th>
							<td>My sample description</td>
						</tr>
						<tr>
							<th>Author</th>
							<td>Anonymous</td>
						</tr>
						<tr>
							<th>Clip ID</th>
							<td><a href="">G15CZA9</a></td>
						</tr>
					</tbody>
					</table>
				</div>  

			</div>


			);

	}

}