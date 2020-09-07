// require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const restaurantRouter = require("./routes/restaurant");
const mealRouter = require("./routes/meal");
const cusineRouter = require("./routes/cusine");
const cityRouter = require("./routes/city");
// const DB = process.env.DATABASE.replace(
// 	"<PASSWORD>",
// 	process.env.DATABASE_PASSWORD
// );
// console.log(process.env);
const DB =
	"mongodb+srv://brianstevo:root@cluster0.ci5jy.mongodb.net/mern-edureka?retryWrites=true&w=majority";
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		// console.log(con.connection);
		console.log("DB connected");
	});

// mongoose
// 	.connect(process.env.DATABASE, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 		useFindAndModify: true,
// 	})
// 	.then(() => {
// 		// console.log(con.connection);
// 		console.log("DB connected");
// 	});

//MiddleWare
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
//routes

app.use("/api", restaurantRouter);
app.use("/api", mealRouter);
app.use("/api", cusineRouter);
app.use("/api", cityRouter);

const port = 8000;
app.listen(port, () => {
	console.log(`App listening on port ${port} and on http://127.0.0.1:${port}`);
});
