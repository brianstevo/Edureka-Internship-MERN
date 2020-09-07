const Cusine = require("../models/cusine");

exports.getCusineById = (req, res, next, id) => {
	Cusine.findById(id).exec((err, cusine) => {
		if (err || !cusine) {
			return res.status(400).json({
				error: "Cusine not found in DB",
			});
		}
		req.meal = cusine;
		next();
	});
};

exports.createCusine = async (req, res) => {
	try {
		const cusine = await Cusine.create(req.body);
		res.status(201).json(cusine);
	} catch (err) {
		res.status(400).json({
			error: "not able to save in DB",
		});
	}
};

exports.getAllCusine = async (req, res) => {
	try {
		const cusines = await Cusine.find(); //find returns a promisee use async await or exec() to handle it
		res.status(200).json(cusines);
	} catch (err) {
		return res.status(400).json({
			error: "No Cusine available",
		});
	}
};

exports.getCusine = (req, res) => {
	return res.json(req.cusine);
};

// exports.updateCusine = (req, res) => {
// 	const cusine = req.cusine;
// 	cusine.name = req.body.name;

// 	cusine.save((err, updatedCusine) => {
// 		if (err) {
// 			return res.status(400).json({
// 				error: "Failed to update Cusine",
// 			});
// 		}
// 		res.json(updatedCusine);
// 	});
// };

// exports.deleteCusine = async (req, res) => {
// 	try {
// 		await Cusine.findByIdAndDelete(req.Cusine._id);

// 		res.status(200).json({
// 			status: "DELETED successfully",
// 		});
// 	} catch (err) {
// 		return res.status(404).json({
// 			message: "Not authorized to DELETE",
// 			error: err,
// 		});
// 	}
// };
