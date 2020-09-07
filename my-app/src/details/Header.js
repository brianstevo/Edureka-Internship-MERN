import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<nav>
				<div className="header-logo">
					<Link to="/">
						<b>F</b>
					</Link>
				</div>
				<ul>
					<li className="login">
						<Link to="/">Home</Link>
					</li>
					<li className="login">
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link className="create" to="/login">
							Create an account
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
