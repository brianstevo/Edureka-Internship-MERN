const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const RestaurantSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true,
		},
		address: {
			type: String,
			required: true,
			maxlength: 1000,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true,
		},
		cityData: {
			type: ObjectId,
			ref: "City",
		},
		price: {
			type: Number,
			required: true,
			maxlength: 100,
			trim: true,
		},
		contact: {
			type: Number,
			maxlength: 15,
			trim: true,
		},
		type: [
			{
				type: ObjectId,
				ref: "Meal",
			},
		],
		cusine: [
			{
				type: ObjectId,
				ref: "Cusine",
			},
		],
		photo: {
			type: Array,
			default: [],
		},
		gallery: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
