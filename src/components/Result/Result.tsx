import { useCallback, useEffect, useState } from 'react';
import client from '../../services/client';
import { City } from '../../services/model';
import { WeatherData } from '../../services/models/weather';

import './Result.css';

const FARENHEIT = `°F`;
const MPH = 'mph';

const TEMPERATURE_UNIT = FARENHEIT;
const WIND_SPEED_UNIT = MPH;

const ICON_BASE_URL = 'https://openweathermap.org/img/wn';
const ICON_EXTENSION = '.png';

interface ResultProps {
    city: City;
}

const Result = ({ city }: ResultProps) => {
    const [ weatherData, setWeatherData ] = useState<WeatherData | undefined>();
    const [ loading, setLoading ] = useState(false);

    const loadData = useCallback(
        async(city: City) => {
            try {
                setLoading(true);
                const result = await client.GetWeather(city.lat, city.lon);
                setWeatherData(result);
            }   
            finally {
                setLoading(false);
            }
        },
        []
    )

    useEffect(
        () => {
            const isDifferentLocation = weatherData?.coord?.lat?.toFixed(4) !== city.lat.toFixed(4) 
                || weatherData?.coord?.lon?.toFixed(4) !== city.lon.toFixed(4);

            if (isDifferentLocation) {
                loadData(city);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [city]
    )

    const weather = weatherData?.weather.length ? weatherData.weather[0] : undefined;
    const iconUrl = `${ICON_BASE_URL}/${weather?.icon}${ICON_EXTENSION}`;
    return (
        <div className="result">
            <div className="row title">
                <div className="city-name">{city?.name}</div>
                <div className="city-circle">
                    <img src={iconUrl} />
                </div>
            </div>
            <div className="row data">
                <div className="label">Description:</div>&nbsp;
                <div className="value">{weather?.description}</div>
            </div>
            <div className="row data">
                <div className="label">Current temp:</div>&nbsp;
                <div className="value">
                    {weatherData?.main.temp}
                    <span>{' '}{TEMPERATURE_UNIT}</span>
                </div>
            </div>
            <div className="row data">
                <div className="label">Feels like:</div>&nbsp;
                <div className="value">
                    {weatherData?.main.feels_like}
                    <span>{' '}{TEMPERATURE_UNIT}</span>
                </div>
            </div>
            <div className="row data">
                <div className="label">Wind speed: </div>&nbsp;
                <div className="value">
                    {weatherData?.wind.speed}
                    <span>{' '}{WIND_SPEED_UNIT}</span>
                </div>
            </div>
        </div>
    )
}

export default Result;