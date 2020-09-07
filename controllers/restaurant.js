const Restaurant = require("../models/restaurant");

exports.getRestaurantById = (req, res, next, id) => {
	Restaurant.find({ _id: id })
		.populate("type cusine cityData")
		.exec((err, restlist) => {
			if (err || !restlist) {
				return res.status(400).json({
					error: "No data was found in DB",
				});
			}
			req.list = restlist;
			next();
		});
};

exports.getRestaurantByCity = (req, res, next, id) => {
	Restaurant.find({ city: { $regex: id, $options: "i" } })
		.limit(3)
		.populate("type cusine cityData")
		.exec((err, restlist) => {
			if (err || !restlist) {
				return res.status(400).json({
					error: "No data was found in DB",
				});
			}
			req.list = restlist;
			next();
		});
};

exports.getRestaurantByName = (req, res, next, id) => {
	Restaurant.find({ name: { $regex: id, $options: "i" } })
		.populate("type cusine cityData")
		.exec((err, restlist) => {
			if (err || !restlist) {
				return res.status(400).json({
					error: "No data was found in DB",
				});
			}
			req.list = restlist;
			next();
		});
};

exports.createRestaurant = async (req, res) => {
	try {
		res.type("json");
		const restaurant = await Restaurant.create(req.body);
		res.status(201).json(restaurant);
	} catch (err) {
		res.status(404).json({
			error: err,
		});
	}
};

exports.getRestaurant = (req, res) => {
	return res.json(req.list); //received by getListById
};

exports.getAllRestaurant = async (req, res) => {
	try {
		const allList = await Restaurant.find().populate("type cusine cityData"); //find returns a promisee use async await or exec() to handle it
		res.status(200).json(allList);
	} catch (err) {
		return res.status(400).json({
			error: "error in getting Restaurant list",
		});
	}
};
exports.getAllCity = async (req, res) => {
	try {
		const allList = await Restaurant.distinct("city"); //find returns a promisee use async await or exec() to handle it
		res.status(200).json(allList);
	} catch (err) {
		return res.status(400).json({
			error: "error in getting Restaurant list",
		});
	}
};

exports.getAllRestaurantWithFilter = async (req, res) => {
	try {
		let mealtype = req.query.mealtype;
		// mealtype = mealtype.split(",");
		let cusine = req.query.cusine;
		cusine = cusine.split(",");
		const page = req.query.page * 1 || 1;
		const limit = 2;
		const skip = (page - 1) * limit;
		//["Fast Food", "South Indian"]
		let sortBy = req.query.sort * 1 === 1 ? 1 : -1;

		const city = req.query.city;
		// let min = req.query.min ? req.query.min * 1 : 0;
		// let max = req.query.max ? req.query.max * 1 : 100000;
		let min = 0,
			max = 2000000;
		const price = req.query.price * 1 || 0;
		if (price === 0) {
			min = 0;
			max = 2000000;
		} else if (price === 1) {
			min = 0;
			max = 500;
		} else if (price === 2) {
			min = 500;
			max = 1000;
		} else if (price === 3) {
			min = 1000;
			max = 1500;
		} else if (price === 4) {
			min = 1500;
			max = 2000;
		} else if (price === 5) {
			min = 2000;
			max = 2000000;
		}
		const allList = await Restaurant.aggregate([
			{
				$unwind: "$type",
			},
			{
				$lookup: {
					from: "meals",
					localField: "type",
					foreignField: "_id",
					as: "meal",
				},
			},
			{
				$match: { "meal.name": `${mealtype}` },
			},
			{
				$match: { city: `${city}` },
			},
			{
				$unwind: "$cusine",
			},
			{
				$lookup: {
					from: "cusines",
					localField: "cusine",
					foreignField: "_id",
					as: "cusines",
				},
			},
			{
				$match: { "cusines.name": { $in: cusine } },
			},
			{
				$match: { price: { $gte: min, $lt: max } },
			},
			{
				$sort: { price: sortBy },
			},
			{
				$skip: skip,
			},
			{
				$limit: limit,
			},
		]);
		if (allList == "") throw new Error("This page does not exist");
		// .populate("type cusine cityData"); //find returns a promisee use async await or exec() to handle it
		res.status(200).json(allList);
	} catch (err) {
		return res.status(400).json({
			error: err,
		});
	}
};
