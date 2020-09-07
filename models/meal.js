const mongoose = require("mongoose");
const MealSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 32,
		trim: true,
		unique: true,
	},
});

const Meal = mongoose.model("Meal", MealSchema);
module.exports = Meal;
