import { combineReducers } from 'redux';

import { np } from './nowPlaying.js';
import { detail } from './detail.js';



export default combineReducers({

	np,
	detail

});