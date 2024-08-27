import { createContext, useContext, useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import WeatherInfo from './WeatherInfo';
import WheatherInterface from './WheatherInterface';

export const weatherContext = createContext();
export default function App() {
	const [weatherCity, setWeatherCity] = useState('');

	return (
		<div className="app">
			<weatherContext.Provider value={{ weatherCity, setWeatherCity }}>
				<WheatherInterface />
				<WeatherInfo />
			</weatherContext.Provider>
		</div>
	);
}
