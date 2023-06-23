import { useEffect, useState } from "react";
import styles from '../App.css';
import config from "../config"
import { Location } from "./types";

interface WeatherProps {
  selectedLocation: Location | null;
  updateForecastData: (data: object) => void; //specifies that updateWeatherData is a function that takes an object as an argument and returns nothing
}


const Weather = ( {selectedLocation, updateForecastData }: WeatherProps) => 
{
  const [forecastData, setForecastData] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [currWeatherIcon, setCurrWeatherIcon] = useState<string>("");

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      if(!selectedLocation) return;

      //fetch current weather data for particular city
      try {
        console.log(`Location id for current weather is: ${selectedLocation.id}`)
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${selectedLocation.id}&appid=${config.apiKey}&units=metric`);
        
        if (!currentWeatherResponse.ok){
          throw new Error('Weather data request failed');
        }

        const currResponseData = await currentWeatherResponse.json();
        console.log ('Current Weather data:', currResponseData)
        setCurrentWeather(currResponseData); 

        const currIconCode = currResponseData.weather[0].icon; //to be used to display appropiate icon for current weather
        const currIconURL: string = `https://openweathermap.org/img/wn/${currIconCode}@2x.png`
        setCurrWeatherIcon(currIconURL);
        
      } 
      catch (error) {
        console.error("Error fetching current Weather data", (error as Error).message);
      }
    };
    
    const fetchForecast = async () => {
      if (!selectedLocation) return;

      //fetch forecast data for particular city
      try {
        console.log(`Location id for forecast fetch: ${selectedLocation.id}`)
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${selectedLocation.id}&appid=${config.apiKey}&units=metric`);
        
        if (!weatherResponse.ok){
          throw new Error('Forecast data request failed');
        }

        const forecastData = await weatherResponse.json();
        console.log ('Forecast data:', forecastData)
        setForecastData(forecastData); 
        updateForecastData(forecastData);
        
      } 
      catch (error) {
        console.error("Error fetching forecast data", (error as Error).message);
      }
    };

    fetchCurrentWeather();
    fetchForecast();
  }, [selectedLocation]);


  return(
      <div className="row border rounded ms-0 me-0 mb-5 contentBox ">
        
        
        <div className="col-5 d-flex align-items-center justify-content-center border-end border- border-light">
          
          {currentWeather ? (
            <div className = "text-center">
              <h2 className="display-3 mb-0"> 
                {Math.round(currentWeather.main.temp)}<sup>°C</sup> 
              </h2>
              <p>{`Feels like ${Math.round(currentWeather.main.feels_like)}`}°C</p>
              <h3 className="fs-4 pt-2 text-info">
                {`${selectedLocation?.name}, ${selectedLocation?.country}`}
              </h3>
              {`Humidity: ${currentWeather.main.humidity}%`} 
            </div>
            ) : (<div>Loading weather from openweather...</div>)
          }
          
        </div>

        <div className="col pt-3 pb-3 ms-0 me-0">
          
          {currentWeather ? (
            <div className = "text-center">
              <h2 className= "weatherIcon fs-2 d-inline "> 
                <img src={currWeatherIcon} alt="weather icon" className="mb-0 pb-0"/>
              </h2>
              
              <div className="fs-4 pb-0">
                {`${currentWeather.weather[0].description}`}
              </div>

              <p className="mb-0 pb-0 mt-2"> {`Min: ${Math.round(currentWeather.main.temp_min)}°C`}  </p>
              <p className="mb-0 pb-3"> {`Max: ${Math.round(currentWeather.main.temp_max)}°C`}  </p>
                            
            </div>
            ) : (<div>Loading...</div>)
          }
          
        </div>

      </div>
  )

}

export default Weather;

//useEffect starting around line 17 works by executing what is in side, each time the state of the item passed after the end comma changes ("selectedLocation" in this case)
//conditional rendering occurs with the use of  { data ? (do this) : (if not do this)}