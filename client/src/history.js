import React from 'react';

export default class HistoryList extends React.Component {

	render() {

		return (

			<div className="history-columns">
				<div className="history-item">
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

				<div className="history-item">
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