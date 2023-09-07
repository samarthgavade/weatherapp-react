import React, {useEffect, useState } from 'react';
import '../Components/weatherapp.css';


const Weatherapp = () =>{
    const[enterCity, setEnterCity] = useState('Mumbai');
    const [cityTemp, setCityTemp] = useState({});

    const handleInput = async () =>{
        try{
            let weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity}&units=metric&appid=41156a9281cc05a9f2cc0eb5cfcfefac`

            const response = await fetch(weatherData);
            const data = await response.json();
        
            const {temp,humidity,pressure} = data.main;
            const {main:weathertype} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;
            
            const myWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathertype,
                name,
                speed,
                country,
                sunset
            };
            setCityTemp(myWeatherInfo);
            setEnterCity('');

        }catch(error){
            console.log(error);
        }
    }

        
    let sec = cityTemp.sunset;
    let date = new Date(sec * 1000);
    let timeStr = `${date.getHours()}:${date.getMinutes()}`;

    useEffect(()=>{
            handleInput();
    },[]);
    
    
    return(
       <>
       <div className='main_div'>
            <div className='child_div'>
                <div className='sub_div'>

                    <div className='search_div'>
                        <input type="text"
                                className='search_input'
                                placeholder='Enter city'
                                onChange={(e)=>setEnterCity(e.target.value)}
                                value={enterCity}
                        />
                        <button className='search_button'
                                onClick={handleInput}
                                >Search
                        </button>
                    </div>

                <div className='display_search'>
                <div className='weather_icon'>
                <img className='weather_img' src="/images/weather_icon/day-and-night.png" alt="No Image" /> 
                </div>
                <div className='weather_details'>
                    <div className='current_temp'>
                    <div className='current_deg'>{cityTemp.temp}<span>&deg;C</span></div>
                    <div className='weather_location'> 
                    <div className='weather_kind'>{cityTemp.weathertype}</div>
                    <div className='city_weather'>{`${cityTemp.name}, ${cityTemp.country}`}</div>
                    </div>
                    </div>
                    <div className='time_date'><p className='display_time'>{new Date().toLocaleString()}</p></div>
                </div>

                <div className='weather_data'>
                    <div className='data_div'>
                    <div className='data_icon'><i class="fa-solid fa-mountain-sun"></i></div>
                    <div className='data_icon_detail'>{`${timeStr} ${'PM'}`}<br/>Sunset</div>
                    </div>
                    <div className='data_div'>
                    <div className='data_icon'><i class="fa-brands fa-drupal"></i></div>
                    <div className='data_icon_detail'>{cityTemp.humidity}<br/>Humidity</div>
                    </div>
                    <div className='data_div'>
                    <div className='data_icon'><i class="fa-solid fa-cloud-showers-heavy"></i></div>
                    <div className='data_icon_detail'>{cityTemp.pressure}<br/>Pressure</div>
                    </div>
                    <div className='data_div'>
                    <div className='data_icon'><i class="fa-solid fa-wind"></i></div>
                    <div className='data_icon_detail'>{cityTemp.speed}<br/>Speed</div>
                    </div>
                </div>
            </div>

                </div>
            </div>
       </div>
       </>
    )
}

export default Weatherapp;