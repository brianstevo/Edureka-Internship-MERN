import "./App.css";
import React from "react";
import { Carousel } from "react-responsive-carousel";

export default function Image({ value }) {
	return (
		<div>
			<Carousel>
				{value.map((item, index) => (
					<img key={index} src={item.photo} alt="" />
				))}
				{value.map((item, index) =>
					item.gallery.map((it) => <img key={index} src={it} alt="" />)
				)}
			</Carousel>
			<div className="img-header">
				<h2>
					{value.map((item, index) => (
						<span key={index}>{item.name}</span>
					))}
				</h2>
			</div>
		</div>
	);
}
