import { API } from "./../backend";

export const getAllCity = async () => {
	try {
		const response = await fetch(`${API}/city/restaurant/`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		return;
	}
};

export const getRestauranrByFilter = async (
	cusine,
	currentPage,
	mealtype,
	sortVal,
	radioVal,
	city
) => {
	try {
		const response = await fetch(
			`${API}/filter/restaurant/?cusine=${cusine}&page=${currentPage}&mealtype=${mealtype}&sort=${sortVal}&price=${radioVal}&city=${city}`,
			{
				method: "GET",
			}
		);
		return response.json();
	} catch (err) {
		return err;
	}
};
