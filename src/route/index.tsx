import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Review from "../pages/Review";

export default function AppsRoutes() {
	return (
		<div className="p-4 lg:p-10">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:pokemon" element={<Detail />} />
					<Route path="/:pokemon/review" element={<Review />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
