import { combineReducers } from 'redux';

import { np } from './nowPlaying.js';
import { hist } from './history.js';



export default combineReducers({

	np,
	hist

});