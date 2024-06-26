import './WeatherApp.css';
import sunny_icon from '../../Assets/../../assets/weather/64x64/day/sunny.png';
import clear_icon from "../../Assets/../../assets/weather/64x64/day/clear.png";
import cloud_icon from "../../Assets/../../assets/weather/64x64/day/cloud.png";
import drizzle_icon from "../../Assets/../../assets/weather/64x64/day/drizzle.png";
import rain_icon from "../../Assets/../../assets/weather/64x64/day/rain.png";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from 'react';
import { WiHumidity } from "react-icons/wi";
import { LuWind } from 'react-icons/lu';


const WeatherApp = () => {
    const [wicon, setWicon] = useState(cloud_icon);
    const [weatherData, setWeatherData] = useState(null);

    const search = async () => {
        const element = document.querySelector(".cityInput");
        if (!element || element.value === "") {
            console.error("City input not found or empty");
            return;
        }

        const api_key = "d0b7abc2b79441ef8e993054241303";
        const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${element.value}&units=Metric&aqi=no`;

        try {
            const res = await fetch(url);
            if (!res.ok) {
                console.error("Failed to fetch weather data:", res.statusText);
                return;
            }

            const data = await res.json();
            console.log("Received weather data:", data);
            setWeatherData(data);





            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");

            humidity[0].innerHTML = data.current.humidity + "%";
            wind[0].innerHTML = data.current.wind_kph + "kph";




            const iconCode = data.current.condition.code;

            if (iconCode === 1000 || iconCode === 1003) {
                setWicon(sunny_icon);
            } else if (iconCode >= 1006 && iconCode <= 1009) {
                setWicon(cloud_icon);
            } else if (iconCode >= 1063 && iconCode <= 1072) {
                setWicon(drizzle_icon);
            } else if (iconCode >= 1180 && iconCode <= 1195) {
                setWicon(rain_icon);
            } else {
                setWicon(clear_icon);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder="search" />
                <div className='flex justify-center items-center w-14 h-14 rounded-full bg-white' onClick={search}>
                    <IoSearchOutline />
                </div>
            </div>
            <div className='weather-card'>
                <div className='weather-card-content'>
                    <div className='flex justify-center items-center mt-10'>
                        {weatherData && <img src={weatherData.current.condition.icon} alt="Weather icon" />}
                    </div>
                    <div className='weather-location flex justify-center text-[#1d0d81] font-normal text-4xl'>{weatherData && weatherData.location.name}</div>
                    <div className='weather-temperature flex justify-center text-[#1d0d81] font-normal text-6xl '>{weatherData && weatherData.current.temp_c}°C</div>
                    <div className='weather-condition flex justify-center text-[#1d0d81] font-normal text-2xl '>{weatherData && weatherData.current.condition.text}</div>



                    <div className='data-container flex mt-[50px] text-[#1d0d81] justify-evenly gap-4'>
                        {weatherData && weatherData.current && (
                            <div className='element'>
                                <div>
                                    <WiHumidity className='mt-3 ' />
                                </div>
                                <div className='dataE'>
                                    <div className="humidity-percent">{weatherData.current.humidity}%</div>
                                    <div className="text">Humidity</div>
                                </div>
                            </div>
                        )}
                        {weatherData && weatherData.current && (
                            <div className='element'>
                                <div>
                                    <LuWind className='mt-3 ' />
                                </div>
                                <div className='dataE'>
                                    <div className="wind-rate">{weatherData.current.wind_kph}kph</div>
                                    <div className="text">Wind Speed</div>
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
