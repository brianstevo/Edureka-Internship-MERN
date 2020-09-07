const express = require("express");
const router = express.Router();

const cusineHandler = require("../controllers/cusine");

router.param("cusineId", cusineHandler.getCusineById); //param userId should be matching with :userId otherwise middleware getUserById wont trigger

router.get("/cusine/:cusineId", cusineHandler.getCusine);
router.get("/cusine", cusineHandler.getAllCusine);

router.post("/cusine/create", cusineHandler.createCusine);

module.exports = router;
