import React, { useState, useEffect } from "react";
import "./search.css";
import { useLocation } from "react-router-dom";
import { getAllCity, getRestauranrByFilter } from "./searchapicalls";
import Header from "../details/Header";
import App from "./App";

const checkList = [
	{
		_id: 1,
		name: "North Indian",
	},
	{
		_id: 2,
		name: "South Indian",
	},
	{
		_id: 3,
		name: "Chinese",
	},
	{
		_id: 4,
		name: "Fast Food",
	},
	{
		_id: 5,
		name: "Street Food",
	},
];
const radList = [
	{
		id: 1,
		name: "Less than 500",
	},
	{
		id: 2,
		name: "500 to 1000",
	},
	{
		id: 3,
		name: "1000 to 1500",
	},
	{
		id: 4,
		name: "1500 to 2000",
	},
	{
		id: 5,
		name: "2000+",
	},
];
const sortList = [
	{
		id: 1,
		name: "Price low to high",
	},
	{
		id: 2,
		name: "Price high to low",
	},
];
function useQuery() {
	return new URLSearchParams(useLocation().search);
}
export default function Search() {
	const [currentPage, setCurrentPage] = useState(1);
	const [offset, setOffset] = useState(0);
	const [cityvalues, setcityValues] = useState([]);
	const [city, setCity] = useState("Bangalore");
	const [value, setValue] = useState([]);
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);
	const [checked, setChecked] = useState([
		"North Indian",
		"South Indian",
		"Chinese",
		"Fast Food",
		"Street Food",
	]);
	const [radioVal, setRadioVal] = useState(0);
	const [sortVal, setSortVal] = useState(1);

	let query = useQuery();
	let mealtype = query.get("type");
	const [istrue, setTrue] = useState(false);

	const sayTrue = () => {
		setTrue(!istrue);
	};
	const handleToggle = (id) => {
		const currentIndex = checked.indexOf(id);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(id);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
		setReload(!reload);
	};
	const cusinevalue = checked.join(",");
	const preload = async () => {
		setcityValues([]);
		//backend request firing
		try {
			const data = await getAllCity(); //name is sent like object so that stringify in fetch works
			if (data.error) {
				return;
			} else {
				setcityValues(data);
			}
		} catch {
			return;
		}
	};
	const loadRestaurantFilterData = async (cusinevalue, currentPage) => {
		//backend request firing
		try {
			setValue([]);
			const data = await getRestauranrByFilter(
				cusinevalue,
				currentPage,
				mealtype,
				sortVal,
				radioVal,
				city
			); //name is sent like object so that stringify in fetch works
			if (data.error) {
				setError(true);
			} else {
				setError("");
				setValue(data);
			}
		} catch {
			console.log("error in fetch");
		}
	};
	useEffect(() => {
		preload();
	}, []);
	useEffect(() => {
		loadRestaurantFilterData(cusinevalue, currentPage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload, currentPage, mealtype, sortVal, radioVal]);

	const errormessage = () => (
		<div className="Item-error">
			<div className=" Tile-header-error">Sorry.No result-found</div>
			<div className="">Try Different Options !</div>
		</div>
	);
	return (
		<div className="container-fluid">
			<Header />
			<div className="header-title">
				{mealtype} Places in {city}
			</div>
			<div className="search-row">
				<div className="left-panel">
					<div className="hide show" onClick={sayTrue}>
						Filter/Sort
					</div>
					<div className={istrue ? "filter-search" : "close shadow"}>
						<div className="Filters">Filters</div>
						<div className="Select-Location">Select Location</div>
						<select
							className="select-search"
							onChange={(e) => {
								setCity(e.target.value);
								setReload(!reload);
							}}
						>
							{cityvalues.map((value, index) => (
								<option
									className="select-search-option"
									key={index}
									value={value}
								>
									{value}
								</option>
							))}
						</select>
						<div className="Cuisine">Cuisine</div>
						{checkList.map((value, index) => (
							<div className="block" key={index}>
								<input
									type="checkbox"
									defaultChecked
									className="inline-block check-box"
									onChange={() => {
										handleToggle(value.name);
									}}
								/>
								<span className="inline-block checkbox-option">
									{value.name}
								</span>
							</div>
						))}
						<div className="radio-header">Cost For Two</div>
						{radList.map((value, index) => (
							<div className="block" key={index}>
								<input
									type="radio"
									className="inline-block"
									name="cost"
									value={value.id}
									onChange={(e) => {
										setRadioVal(e.target.value);
										setReload(!reload);
									}}
								/>
								<span className="inline-block checkbox-option">
									{value.name}
								</span>
							</div>
						))}
						<div className="Sort-option">Sort</div>
						{sortList.map((value, index) => (
							<div className="block" key={index}>
								<input
									type="radio"
									className="inline-block"
									name="sort"
									value={value.id}
									onChange={(e) => {
										setSortVal(e.target.value);
										setReload(!reload);
									}}
								/>
								<span className="inline-block checkbox-option">
									{value.name}
								</span>
							</div>
						))}
						<div className="hide apply" onClick={sayTrue}>
							Apply
						</div>
					</div>
				</div>
				<div className="right-panel">
					{error && errormessage()}
					{value.map((val, index) => (
						<div className="Item" key={index}>
							<div className="right-row item-padding">
								<div className="item-image">
									<img className="Image" src={val.photo} alt="" />
								</div>
								<div className="item-info">
									<div className="Tile-header">{val.name}</div>
									<div className="address">{val.address}</div>
								</div>
							</div>

							<div className="right-row item-padding">
								<div className="item-details">
									<div className="details">CUISINES:</div>
									<div className="details">COST FOR TWO:</div>
								</div>
								<div className="item-value">
									{/* <div className="details-value"> */}
									{val.cusines.map((v, index) => (
										<div key={index} className="details-value">
											{v.name}
										</div>
									))}
									{/* </div> */}
									<div className="details-value">₹ {val.price}</div>
								</div>
							</div>
						</div>
					))}
					<App
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						offset={offset}
						setOffset={setOffset}
					/>
				</div>
			</div>
		</div>
	);
}
