const mongoose = require('mongoose'),
	  Schema   = mongoose.Schema;

const favorite = new Schema({
		name: { type: String, require: true, index: 1 },
	 	author: String,
		genre: String,
	 	published: String
 	});

const f_user = new Schema({
		user_id: { type: Number, require: true, index: 1 },
		user_name: String,
		favorites: [favorite]
	 });

const User = mongoose.model('f_user',f_user);

module.exports = User;

