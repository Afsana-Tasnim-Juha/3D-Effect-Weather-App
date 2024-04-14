import './WeatherApp.css'
//import weatherImage from '../../../assets/weather/64x64/day/weatherImage.jpg'
//import sunny from '../../Assets/../../assets/weather/64x64/day/sunny.png'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
const WeatherApp = () => {

    let api_key = "d0b7abc2b79441ef8e993054241303";
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value === "") {
            return 0;
        }
        let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${element[0].value}&units=Metric&aqi=no`;
        let res = await fetch(url);
        let data = await res.json();
        const temperature = document.getElementsByClassName("weather-temperature");
        const location = document.getElementsByClassName("weather-location");
        const condition = document.getElementsByClassName("weather-condition");
        temperature[0].innerHTML = data.current.temp_c + "°c";
        location[0].innerHTML = data.location.name;
        condition[0].innerHTML = data.current.condition.text;



    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder="search" />
                <div className='flex justify-center items-center w-14 h-14 rounded-full bg-white' onClick={() => { search() }}>
                    <IoSearchOutline />
                </div>
            </div>
            <div className='flex justify-center items-center mt-10' >
                < TiWeatherPartlySunny className=' w-40 h-40' />
            </div>

            <div className='weather-location flex justify-center text-white font-normal text-4xl'></div>
            <div className='weather-temperature flex justify-center text-white font-normal text-6xl '></div>
            <div className='weather-condition flex justify-center text-white font-normal text-2xl '></div>


        </div>
    );
};

export default WeatherApp;