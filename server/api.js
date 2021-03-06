var express = require('express');
var mongoose = require('mongoose');

var clipQueue = require('./clipQueue');


global.Promise = mongoose.Promise = require('bluebird');

var router = express.Router();




var ClipSchema = new mongoose.Schema({

	title: String,
	description: String,
	author: String,

	duration: Number,

	fullAudio: String,
	reducedAudio: [Number]

});

var ClipModel = mongoose.model('ClipModel', ClipSchema);




router.get('/history/:id?/:direction?/:count?', function(req, res, next) {

	if(req.params.id == 'recent') {

		var refTimestampID = mongoose.Types.ObjectId();

	} else {

		var refTimestampID = mongoose.Types.ObjectId(req.params.id);

	}

	
	var direction = req.params.direction || 'past';

	var count = req.params.count || 4;


	// Value sanitization. (more fancy stuff can be done here)

	count = Math.min(4, Number(count));
	var sortDirection = direction == 'past' ? -1 : 1;
	var queryDirection = direction == 'past' ?
		{ $lt: refTimestampID } : { $gt: refTimestampID };


	ClipModel.find({

		_id: queryDirection

	}).sort({ _id: sortDirection }).limit(count + 1).select({

		title: 1,
		description: 1,
		author: 1,
		reducedAudio: 1

	}).exec().then(val => {

		// We limit to count + 1 so that we can notify the
		// frontend that there are no more documents even if the 
		// full request is returned.

		res.json({

			type: 'Success',
			more: val.length > count,
			data: val.slice(0, count)

		});	

	}, err => {

		res.json({

			type: 'Error',
			description: 'History lookup failed.'

		});

	});

});



// Detailed clip information
router.get('/clip/:id', function(req, res, next) {

	var id = mongoose.Types.ObjectId(req.params.id);


	ClipModel.findOne({ _id: id }).exec().then(val => {

		res.json({

			type: 'Success',
			data: val

		});

	}, err => {

		res.json({

			type: 'Error',
			description: 'Clip lookup failed.'

		});

	});

});


router.post('/submit', function(req, res, next) {


	// Do something more advanced with this.

	if(typeof req.body.title != 'string' || req.body.title === '') {

		res.json({

			type: 'Error',
			description: 'Submit failed: bad title.'

		});

		return;

	}

	if(typeof req.body.description != 'string') {

		res.json({

			type: 'Error',
			description: 'Submit failed: bad description.'

		});

		return;

	}

	if(typeof req.body.author != 'string') {

		res.json({

			type: 'Error',
			description: 'Submit failed: bad author.'

		});

		return;

	}



	ClipModel.create({

		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		duration: req.body.duration,
		fullAudio: req.body.fullAudio,
		reducedAudio: req.body.reducedAudio

	},

	function(err, inst) {

		if(err) {

			res.json({

				type: 'Error',
				description: "Test error"

			});

		} else {

			clipQueue.enqueue(inst._id);


			res.json({

				type: 'Success'

			});

		}

	});

});



router.use('/', function(req, res, next) {

	res.json({

		type: 'Error',
		description: 'Invalid request.'

	});

});


module.exports = router;