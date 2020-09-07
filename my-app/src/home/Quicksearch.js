import React from "react";
import { Link } from "react-router-dom";
import "./../App.css";
import breakfast from "./../images/breakfast.png";
import drinks from "./../images/drinks.png";
import lunch from "./../images/lunch.png";
import snacks from "./../images/snacks.png";
import dinner from "./../images/dinner.png";
import nightlife from "./../images/nightlife.png";

export default function Quicksearch() {
	return (
		<div className="mb-20">
			<div className="card-container">
				<div className="card-title">
					<h2>Quick searches</h2>
					<h3>Discover restaurants by type of meal (Click below!)</h3>
				</div>
			</div>
			<div className="row">
				<Link to="/search?type=breakfast">
					<div className="col-1-of-3">
						<div className="card">
							<div className="first-card">
								<img src={breakfast} alt="breakfast" />
							</div>
							<div className="second-card">
								<h4>Breakfast</h4>
								<p>exclusive breakfast options</p>
							</div>
						</div>
					</div>
				</Link>
				<Link to="/search?type=lunch">
					<div className="col-1-of-3">
						<div className="card">
							<div className="first-card">
								<img src={lunch} alt="lunch" />
							</div>
							<div className="second-card">
								<h4>Lunch</h4>
								<p>exclusive Lunch options</p>
							</div>
						</div>
					</div>
				</Link>
				<Link to="/search?type=dinner">
					<div className="col-1-of-3">
						<div className="card">
							<div className="first-card">
								<img src={dinner} alt="dinner" />
							</div>
							<div className="second-card">
								<h4>Dinner</h4>
								<p>exclusive Dinner options</p>
							</div>
						</div>
					</div>
				</Link>
				<Link to="/search?type=snacks">
					<div className="col-1-of-3">
						<div className="card">
							<div className="first-card">
								<img src={snacks} alt="snacks" />
							</div>
							<div className="second-card">
								<h4>Snacks</h4>
								<p>exclusive Snacks options</p>
							</div>
						</div>
					</div>
				</Link>
				<Link to="/search?type=drinks">
					<div className="col-1-of-3">
						<div className="card">
							<div className="first-card">
								<img src={drinks} alt="drinks" />
							</div>
							<div className="second-card">
								<h4>Drinks</h4>
								<p>exclusive Drinks options</p>
							</div>
						</div>
					</div>
				</Link>
				<Link to="/search?type=nightlife">
					<div className="col-1-of-3">
						<div className="card">
							<div className="first-card">
								<img src={nightlife} alt="nightlife" />
							</div>
							<div className="second-card">
								<h4>Nightlife</h4>
								<p>exclusive Nightlife options</p>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
