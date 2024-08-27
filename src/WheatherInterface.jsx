import React, { useContext, useEffect, useState } from 'react';
import { weatherContext } from './App';
export default function WheatherInterface() {
	const { weatherCity, setWeatherCity } = useContext(weatherContext);

	function changeCity(e) {
		setWeatherCity(e.target.value);
	}
	return (
		<div className="homepage">
			<h1 className="main-title">
				Hi! Welcome to our Meteo App, Which city do you wanna check the weather
				forecast?
			</h1>
			<form action="">
				<select
					name="weather-city"
					id="weather-city"
					onChange={changeCity}
					className="city-select"
				>
					<option value="">Select a city</option>
					<option value="Chicago">Chicago</option>
					<option value="New York">New York</option>
					<option value="San Francisco">San Francisco</option>
					<option value="Italy">Italy</option>
				</select>
			</form>
		</div>
	);
}
