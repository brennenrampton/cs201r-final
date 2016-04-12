var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var TripSchema = new Schema({
    title: { type: String, required: true},
    date: { type: String, required: true },
    creator: { type: String, required: true },
    description: { type: String, required: true },
    temple: { type: String, required: true },
    meeting: { type: String, required: true },
    max: {type: Number, required: true, default: 0},
    attending: {type: Number, required: true, default: 0},
    password: { type: String, required: true },
});

TripSchema.pre(save, function(next) {
    var trip = this;

// only hash the password if it has been modified (or is new)
if (!trip.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(trip.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        trip.password = hash;
        next();
    });
});


});

TripSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

TripSchema.methods.addPerson = function(cb) {
	if(this.attending < this.max || this.max === 0)
	{
		this.attending += 1;
	}
	this.save(cb);
};

module.exports = mongoose.model(User, UserSchema);