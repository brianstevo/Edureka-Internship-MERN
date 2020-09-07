import { API } from "./../backend";

export const getRestaurantById = async (resID) => {
	try {
		const response = await fetch(`${API}/details/${resID}`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};
