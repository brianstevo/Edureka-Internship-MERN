const Meal = require("../models/meal");

exports.getMealById = (req, res, next, id) => {
	Meal.findById(id).exec((err, meal) => {
		if (err || !meal) {
			return res.status(400).json({
				error: "Meal not found in DB",
			});
		}
		req.meal = meal;
		next();
	});
};

exports.createMeal = async (req, res) => {
	try {
		const meal = await Meal.create(req.body);
		res.status(201).json(meal);
	} catch (err) {
		res.status(400).json({
			error: "not able to save in DB",
		});
	}
};

// exports.getAllCategory = (req, res) => {
// 	Meal.find().exec((err, categories) => {
// 		if (err) {
// 			return res.status(400).json({
// 				error: "NO categories found",
// 			});
// 		}
// 		res.json(categories);
// 	});
// }

exports.getAllMeal = async (req, res) => {
	try {
		const meals = await Meal.find(); //find returns a promisee use async await or exec() to handle it
		res.status(200).json(meals);
	} catch (err) {
		return res.status(400).json({
			error: "No Meal available",
		});
	}
};

exports.getMeal = (req, res) => {
	return res.json(req.meal);
};

// exports.updateCategory = async (req, res) => {
// 	try {
// 		const category = await Meal.findByIdAndUpdate(
// 			req.category._id,
// 			req.body,
// 			{
// 				new: true,
// 				useFindAndModify: false,
// 				runValidators: true,
// 			}
// 		);
// 		res.status(200).json({ category });
// 	} catch (err) {
// 		return res.status(404).json({
// 			error: err,
// 		});
// 	}
// };
exports.updateMeal = (req, res) => {
	const meal = req.meal;
	meal.name = req.body.name;

	meal.save((err, updatedMeal) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to update Meal",
			});
		}
		res.json(updatedMeal);
	});
};

exports.deleteMeal = async (req, res) => {
	try {
		await Meal.findByIdAndDelete(req.meal._id);

		res.status(200).json({
			status: "DELETED successfully",
		});
	} catch (err) {
		return res.status(404).json({
			message: "Not authorized to DELETE",
			error: err,
		});
	}
};
