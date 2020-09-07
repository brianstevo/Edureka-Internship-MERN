import React from "react";
import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default function TabC({ value }) {
	const mystyle = {
		paddingRight: "10px",
	};
	return (
		<div className="tabs">
			<Tabs>
				<TabList>
					<Tab>Overview</Tab>
					<Tab>Contact</Tab>
				</TabList>

				<TabPanel>
					<div className="content">
						<h3>About this place</h3>
						<div className="type">
							<h4>Cuisine</h4>
							{value.map((item, index) => (
								<p key={index}>
									{item.cusine.map((it, index) => {
										return (
											<span key={index} style={mystyle}>
												{it.name}
											</span>
										);
									})}
								</p>
							))}
						</div>
						<div className="cost">
							<h4>Average Cost</h4>
							<p>
								₹
								{value.map((item, index) => (
									<span key={index}>{item.price}</span>
								))}{" "}
								for two people (approx.)
							</p>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="content">
						<div className="contact-number">
							<h4>Phone Number</h4>
							{value.map((item, index) => (
								<p key={index}>+91 {item.contact}</p>
							))}
							{/* <p>+91 114004566</p> */}
						</div>
						<div className="city-address">
							{value.map((item, index) => (
								<div key={index}>
									<h2> {item.name}</h2>
									<p> {item.address}</p>
								</div>
							))}
							<p>{value.address}</p>
						</div>
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}
