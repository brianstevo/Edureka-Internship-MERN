import React, { useState, useEffect } from "react";
import "./../App.css";
import { Link } from "react-router-dom";
import {
	getRestaurantByCity,
	getRestaurantByName,
	getAllCity,
} from "./homeapicalls";
// import { API } from "../backend";

export default function Hero() {
	const [cityvalues, setcityValues] = useState([]);
	const [values, setValues] = useState([]);
	const [error, setError] = useState(false);

	const preload = async () => {
		setcityValues([]);
		//backend request firing
		try {
			const data = await getAllCity(); //name is sent like object so that stringify in fetch works
			if (data.error) {
				console.log(data.error);
			} else {
				setcityValues(data);
			}
		} catch {
			console.log("error in fetch");
		}
	};
	useEffect(() => {
		preload();
	}, []);
	const handleChange = async (event) => {
		setError("");
		setValues([]);
		//backend request firing
		if (event.target.value === "") {
			return;
		}
		try {
			const data = await getRestaurantByCity(event.target.value); //name is sent like object so that stringify in fetch works
			if (data.error) {
				setError(true);
			} else {
				setError("");
				setValues(data);
			}
		} catch {
			console.log("error in fetch");
		}
	};
	const handleTextChange = async (event) => {
		setError("");
		setValues([]);
		//backend request firing
		if (event.target.value === "") {
			return;
		}
		try {
			const data = await getRestaurantByName(event.target.value); //name is sent like object so that stringify in fetch works
			if (data.error) {
				setError(true);
			} else {
				setError("");
				setValues([]);
				setValues(data);
			}
		} catch {
			console.log(error);
		}
	};
	return (
		<div className="hero">
			<div className="hero-center">
				<b>F</b>
				<h2>Find the best restaurants, cafes, and bars</h2>
				<form action="GET">
					<input
						className="select"
						list="topic"
						placeholder="Please type a location"
						onChange={handleChange}
					/>

					{/* <option value="food"> </option>
						<option value="drink"> </option>
						<option value="breakfast"> </option>
						<option value="alcohol"> </option> */}
					{/* <select
						name="cities"
						id="cities"
						placeholder="Please type a location"
						onChange={handleChange}
					> */}
					<datalist id="topic">
						{cityvalues.map((value, index) => (
							<option key={index} value={value}>
								{value}
							</option>
						))}
						{/* <option value="Delhi">Delhi</option>
						<option value="Mumbai">Mumbai</option>
						<option value="Bangalore">Bangalore</option>
						<option value="Pune">Pune</option> */}
					</datalist>
					{/* </select> */}
					<div className="search">
						<i className="fas fa-search"></i>
						<input
							type="text"
							placeholder="Search for Restuarants"
							size="25"
							onChange={handleTextChange}
						/>
						<div className="text-search">
							{values.map((item, index) => (
								<Link key={index} to={`/details/${item._id}`}>
									<div className="text-search-div">
										<img className="img-search" src={item.photo} alt="" />
										<div className="title-search">
											<h2> {item.name}</h2>
											<p> {item.address}</p>
											{/* {item.cusine.map((it,index)=>{
												return <p key={index}>{it.name}</p>
											})} */}
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
					{/* {<input list="topic" />
					<datalist id="topic">
						<option value="food"> </option>
						<option value="drink"> </option>
						<option value="breakfast"> </option>
						<option value="alcohol"> </option>
					</datalist> } */}
				</form>
			</div>
		</div>
	);
}
