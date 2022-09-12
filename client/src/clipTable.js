import React from 'react';

import { Link } from 'react-router-dom';


export default function ClipTable({ clip, reduced }) {

	return (

		<table className='clip-data'>
			<tbody>
				
				<tr>
					<th>Title</th>
					<td>{ clip.title }</td>
				</tr>
				<tr>
					<th>Description</th>
					<td>{ clip.description }</td>
				</tr>
				<tr>
					<th>Author</th>
					<td>{ clip.author }</td>
				</tr>
				<tr>
					<th>Clip ID</th>
					<td><Link to={ '/clip/' + clip._id }>{ clip._id }</Link></td>
				</tr>

			</tbody>
		</table>

	);

}