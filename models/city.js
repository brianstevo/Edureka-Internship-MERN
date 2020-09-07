const mongoose = require("mongoose");
const CitySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
		trim: true,
		unique: true,
	},
	country: {
		type: String,
		required: true,
		maxlength: 32,
		trim: true,
	},
});

const City = mongoose.model("City", CitySchema);
module.exports = City;
