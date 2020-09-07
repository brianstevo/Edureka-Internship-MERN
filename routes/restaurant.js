const express = require("express");
const router = express.Router();

const restaurantHandler = require("../controllers/restaurant");

//param userId should be matching with :userId otherwise middleware getUserById wont trigger
router.param("restaurantId", restaurantHandler.getRestaurantById);
router.get("/details/:restaurantId", restaurantHandler.getRestaurant);

router.param("cityId", restaurantHandler.getRestaurantByCity);
router.get("/restaurant/:cityId", restaurantHandler.getRestaurant);

router.param("name", restaurantHandler.getRestaurantByName);
router.get("/restaurant/name/:name", restaurantHandler.getRestaurant);

// router.get("/restaurant/:restaurantId", restaurantHandler.getRestaurant);
router.get("/restaurant/", restaurantHandler.getAllRestaurant);
router.get("/city/restaurant/", restaurantHandler.getAllCity);
router.get("/filter/restaurant/", restaurantHandler.getAllRestaurantWithFilter);

router.post("/restaurant/create/", restaurantHandler.createRestaurant);

// router.delete(
// 	"/product/:productId/:userId",
// 	authHandler.isSignedIn,
// 	authHandler.isAuthenticated,
// 	authHandler.isAdmin,
// 	productHandler.deleteProduct
// );

// router.put(
// 	"/product/:productId/:userId",
// 	authHandler.isSignedIn,
// 	authHandler.isAuthenticated,
// 	authHandler.isAdmin,
// 	productHandler.updateProduct
// );

module.exports = router;
