import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { getAllRestaurant } from "../home/homeapicalls";

function App({ currentPage, setCurrentPage, setOffset }) {
	const [value, setValue] = useState([]);
	const preload = async () => {
		setValue([]);
		//backend request firing
		try {
			const data = await getAllRestaurant(); //name is sent like object so that stringify in fetch works
			if (data.error) {
				console.log(data.error);
			} else {
				setValue(data);
			}
		} catch {
			console.log("error in fetch");
		}
	};
	useEffect(() => {
		preload();
	}, []);

	// const [currentPage, setCurrentPage] = useState(1);

	return (
		<div>
			<Paginator
				totalRecords={value.length}
				pageLimit={2}
				pageNeighbours={4}
				setOffset={setOffset}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}

export default App;
