const express = require("express");
const router = express.Router();

const mealHandler = require("../controllers/meal");

router.param("mealId", mealHandler.getMealById); //param userId should be matching with :userId otherwise middleware getUserById wont trigger

router.get("/meal/:mealId", mealHandler.getMeal);
router.get("/meal", mealHandler.getAllMeal);

router.post("/meal/create", mealHandler.createMeal);

router.delete("/meal/delete/:mealId", mealHandler.deleteMeal);

module.exports = router;
