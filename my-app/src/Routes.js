import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import Details from "./details/Details";
import Search from "./search/Search";
const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/details" exact component={Details} />
				<Route path="/details/:restaurantId" exact component={Details} />
				<Route path="/search" exact component={Search} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
