import React from 'react';

import MediaPlayer from './mediaPlayer.js';


export default class Detail extends React.Component {

	render() {

		return (

			<div className='detail'>
				<h3>Information for <span>{ this.props.match.params.id }</span></h3>

				<div className='clip-item'>
					<table className='clip-data'>
					<tbody>
						<tr>
							<th>Title</th>
							<td>My Sample Title</td>
						</tr>
						<tr>
							<th>Description</th>
							<td>My sample description (full version) this will never be cut off. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, veritatis ducimus sunt adipisci, excepturi voluptate, ratione non temporibus voluptatibus exercitationem perferendis aperiam dolor sapiente numquam voluptatum. Eos quos corporis eligendi!</td>
						</tr>
						<tr>
							<th>Author</th>
							<td>Anonymous</td>
						</tr>
						<tr>
							<th>Clip ID</th>
							<td><a href="">G15CZA9</a></td>
						</tr>

						<tr>
							<th>Uploaded at:</th>
							<td>312/32/123</td>
						</tr>

						<tr>
							<th>Streamed at:</th>
							<td>11/142/41</td>
						</tr>

						<tr>
							<th>URL: </th>
							<td>http://www.google.com/</td>
					</tr>
					</tbody>
					</table>
				</div>

				<MediaPlayer/>
			</div>

		);

	}

}