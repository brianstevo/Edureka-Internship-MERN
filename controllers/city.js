const City = require("../models/city");

exports.getCityById = (req, res, next, id) => {
	City.findById(id).exec((err, city) => {
		if (err || !city) {
			return res.status(400).json({
				error: "City not found in DB",
			});
		}
		req.city = city;
		next();
	});
};

exports.createCity = async (req, res) => {
	try {
		const city = await City.create(req.body);
		res.status(201).json(city);
	} catch (err) {
		res.status(400).json({
			error: "not able to save in DB",
		});
	}
};

exports.getAllCity = async (req, res) => {
	try {
		const city = await City.find(); //find returns a promisee use async await or exec() to handle it
		res.status(200).json(city);
	} catch (err) {
		return res.status(400).json({
			error: "No City available",
		});
	}
};

exports.getCity = (req, res) => {
	return res.json(req.city);
};
