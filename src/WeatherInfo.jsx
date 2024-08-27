import React, { useContext, useEffect, useRef, useState } from 'react';
import { weatherContext } from './App';

export default function WeatherInfo() {
	const { weatherCity, setWeatherCity } = useContext(weatherContext);
	const [weatherData, setWeatherData] = useState(null);
	const [imgLink, setImgLink] = useState('');
	// implementare icone e il resto
	useEffect(() => {
		if (weatherData) {
			setImgLink(`./weather-icons/${weatherData.currentConditions.icon}.svg`);
			console.log(imgLink);
		}
	}, [weatherData]);

	useEffect(() => {
		fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherCity}?key=X4MBL7ESM6KW753CKPK7EMGAM&contentType=json`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setWeatherData(data);
			});
	}, [weatherCity]);
	console.log(new Date().getHours());
	return (
		<div>
			{weatherCity && weatherData ? (
				<div className="city-weather-info">
					<div className="today">
						<h1 className="city-name">{weatherCity}</h1>
						<div className="today-first-section">
							<div className="weather-today-info-first">
								<div className="img-temp-today">
									<img className="today-img" src={imgLink} alt="" />
									<span className="today-temp">
										{parseInt(
											((weatherData.currentConditions.temp - 32) * 5) / 9
										)}
										&deg;
									</span>
								</div>
							</div>
							<p className="today-weather-conditions">
								{weatherData.currentConditions.conditions}
							</p>
							{/* <br /> */}
							<div className="weather-today-info-second">
								<p>
									Precipitations: {weatherData.currentConditions.precipprob}%
								</p>
								<p>
									Humidity: {Number(weatherData.currentConditions.humidity)}%
								</p>
								<p>Wind: {weatherData.currentConditions.windspeed}km/h</p>
							</div>
						</div>

						<h1 className="today-title">Today</h1>
						<div className="today-full-info">
							{weatherData.days[0].hours.map((hour) => {
								return (
									<div
										key={hour.datetimeEpoch}
										className="today-hour-weather-info"
									>
										<img
											className="today-hour-weather-img"
											src={`./weather-icons/${hour.icon}.svg`}
											width={'150px'}
											height={'150px'}
											alt=""
										/>
										<p className="today-hour-weather-datetime">
											{hour.datetime.slice(0, 2)}
										</p>
										<p className="today-hour-weather-temp">
											Temp: {parseInt(((hour.temp - 32) * 5) / 9)}
											&deg;
										</p>
										<p className="today-hour-weather-conditions">
											{hour.conditions}
										</p>
									</div>
								);
							})}
						</div>
					</div>

					<h2 className="forecast-five-days-title">
						forecast for the next 5 days
					</h2>
					<div className="forecast-five-days">
						{weatherData.days.map((day, index) => {
							const hours = new Date().getHours();
							const imgLink = `./weather-icons/${
								day.hours[hours - 1].icon
							}.svg`;
							if (index > 0 && index < 6) {
								return (
									<div key={index} className="forecast-day">
										<img
											className="forecast-img"
											src={imgLink}
											alt=""
											height={'100px'}
											width={'100px'}
										/>
										<h3 className="forecast-date">{day.datetime}</h3>
										<p className="forecast-temp">
											Temp:
											{parseInt(((day.hours[hours - 1].temp - 32) * 5) / 9)}
											&deg;
										</p>
										<p className="forecast-conditions">
											{day.hours[hours - 1].conditions}
										</p>
									</div>
								);
							}
						})}
					</div>
				</div>
			) : (
				<div className="void"></div>
			)}
		</div>
	);
}
