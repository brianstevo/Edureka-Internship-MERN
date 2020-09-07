const mongoose = require("mongoose");
const CusineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 32,
		trim: true,
		unique: true,
	},
});

const Cusine = mongoose.model("Cusine", CusineSchema);
module.exports = Cusine;
