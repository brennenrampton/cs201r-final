var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/temple', function(req,res,next) {
	Trip.find(function(err, trips){
	if(err){ return next(err); }
	res.json(trips);
});
});

router.post('/temple', function(req,res,next) {
	var trip = new Trip(req.body);
	trip.save(function(err,trip){
		if(err){ return next(err); }
		res.json(trip);
	});
});

router.param('trip', function(req,res,next,id) {
	var query = Trip.findById(id);
	query.exec(function (err, trip){
		if (err) { return next(err); }
		if(!trip) { return next(new Error("can't find trip")); }
		req.trip = trip;
		return next();
	});
});

router.get('/temple/:trip', function(req, res) {
	res.json(req.trip);
});

router.put('/temple/:trip/addPerson', function(req, res, next) {
	req.trip.addPerson(function(err, trip){
		if(err) { return next(err); }
		res.json(trip);
	});
});


module.exports = router;
