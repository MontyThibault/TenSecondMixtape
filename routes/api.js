var express = require('express');
var mongoose = require('mongoose');
global.Promise = mongoose.Promise = require('bluebird');

var router = express.Router();


mongoose.connect('mongodb://localhost/tensecondmixtape', {
	useMongoClient: true
});

var db = mongoose.connection;


db.on('error', function(e) {

	console.log("Mongoose connection error");

});

db.once('open', function(e) {

	console.log("We are connected to MongoDB!");

});



var ClipSchema = new mongoose.Schema({

	title: String,
	description: String,
	author: String,

});

var ClipModel = mongoose.model('ClipModel', ClipSchema);




// Recent history
router.get('/history', function(req, res, next) {

	// Get most recent
	var id =  mongoose.Types.ObjectId();
	req.url = '/history/' + id.toString();

	next();

});


// History from point
router.get('/history/:id', function(req, res, next) {

	var refTimestampID = mongoose.Types.ObjectId(req.params.id);

	const radius = 4;



	// Previous clips

	var query1 = ClipModel.find({

		_id: { $lt: refTimestampID }

	}).sort({ _id: 1 }).limit(radius).select({

		title: 1,
		description: 1,
		author: 1

	}).exec();


	// Future clips

	var query2 = ClipModel.find({

		_id: { $gt: refTimestampID }

	}).sort({ _id: 1 }).limit(radius).select({

		title: 1,
		description: 1,
		author: 1

	}).exec();


	Promise.all([query1, query2]).then((vals) => {


		var returnObj = {};

		for(var i = 0; i < vals[0].length; i++) {

			var model = vals[0][i];
			returnObj[model._id.toString()] = model;

		}


		res.json(returnObj);

	});



});



// Detailed clip information
router.get('/clip/:id', function(req, res, next) {

	// req.params.timestamp;

});


router.post('/submit', function(req, res, next) {


	// Do something more advanced with this.

	if(typeof req.body.title != 'String' || req.body.title === '') {

		res.json({

			type: 'Error',
			description: 'Submit failed: bad title.'

		});

	}

	if(typeof req.body.description != 'String') {

		res.json({

			type: 'Error',
			description: 'Submit failed: bad description.'

		})

	}

	if(typeof req.body.author != 'String') {

		res.json({

			type: 'Error',
			description: 'Submit failed: bad author.'

		})

	}


	ClipModel.create({

		title: req.body.title,
		description: req.body.description,
		author: req.body.author,

	},

	function(err, inst) {

		if(err) {

			res.json({

				type: 'Error',
				description: "Test error"

			});

		} else {

			res.json({

				type: 'Success'

			});

		}

	});

});



// Testing purposes only.

router.get('/add', function(req, res, next) {


	ClipModel.create({

		title: "Sample clip",
		description: "Sample description",
		author: "Sample Author",

	});


});



router.use('/', function(req, res, next) {

	res.json({

		type: 'Error',
		description: 'Invalid request.'

	});

});


module.exports = router;