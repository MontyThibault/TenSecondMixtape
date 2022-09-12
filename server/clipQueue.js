var mongoose = require('mongoose');
var db = mongoose.connection; 


var queue = [];


// This is exported as an object so that
// we can dynamically access the lastClip field.

var lc = {
	lastClip: null
};



function enqueue(clipID) {

	queue.push(clipID);

}


function dequeue(callback) {

	function done(val) {

		lc.lastClip = val;
		callback(lc.lastClip);

	};

	if(queue.length) {

		var clipID = queue.shift();

		db.models.ClipModel.findOne({ _id: clipID })
			.exec().then(done);


	} else {

		// Get random clip in DB

		db.models.ClipModel.aggregate({ $sample: { size: 1 } })
			.exec().then(a => done(a[0]));

	}

}


module.exports = { 
	lc: lc,
	enqueue: enqueue,
	dequeue: dequeue
};