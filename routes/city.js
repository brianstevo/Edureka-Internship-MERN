const express = require("express");
const router = express.Router();

const cityHandler = require("../controllers/city");

router.param("cityId", cityHandler.getCityById); //param userId should be matching with :userId otherwise middleware getUserById wont trigger

router.get("/city/:cityId", cityHandler.getCity);
router.get("/city", cityHandler.getAllCity);

router.post("/city/create", cityHandler.createCity);

module.exports = router;
