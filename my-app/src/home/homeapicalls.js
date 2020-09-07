import { API } from "./../backend";

export const getRestaurantByCity = async (cityId) => {
	try {
		const response = await fetch(`${API}/restaurant/${cityId}`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const getAllRestaurant = async () => {
	try {
		const response = await fetch(`${API}/restaurant`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const getRestaurantByName = async (name) => {
	try {
		const response = await fetch(`${API}/restaurant/name/${name}`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const getAllCity = async () => {
	try {
		const response = await fetch(`${API}/city/restaurant/`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};
