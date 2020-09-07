import React, { useEffect, useState } from "react";
import Header from "./Header";
import TabC from "./Tab";
import Image from "./Image";
import { getRestaurantById } from "./detailsapicall";

export default function Details({ match }) {
	const [value, setValue] = useState([]);

	const preload = async (restaurantId) => {
		setValue([]);
		//backend request firing
		try {
			const data = await getRestaurantById(restaurantId); //name is sent like object so that stringify in fetch works
			if (data.error) {
				return;
			} else {
				setValue([]);
				setValue(data);
			}
		} catch {
			return;
		}
	};

	useEffect(() => {
		preload(match.params.restaurantId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Header />
			<main>
				<Image value={value} />
				<TabC value={value} />
			</main>
		</div>
	);
}
