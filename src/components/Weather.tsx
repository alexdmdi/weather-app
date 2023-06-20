import { useEffect, useState } from "react";
import styles from '../App.css';
import config from "../config"
import { Location } from "./types";

interface WeatherProps {
  selectedLocation: Location | null;
  updateWeatherData: (data: object) => void; //specifies that updateWeatherData is a function that takes an object as an argument and returns nothing
}


const Weather = ( {selectedLocation, updateWeatherData }: WeatherProps) => 
{
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!selectedLocation) return;

      //tries to get weather data for particular city based on its ID (ID-city data pairing all from openweaather)
      try {
        console.log(` location id is: ${selectedLocation.id}`)
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${selectedLocation.id}&appid=${config.apiKey}&units=metric`);
        
        if (!weatherResponse.ok){
          throw new Error('Weather data request failed');
        }

        const weatherData = await weatherResponse.json();
        console.log ('Weather data:', weatherData)
        setWeatherData(weatherData); 
        updateWeatherData(weatherData);
        
      } 
      catch (error) {
        console.error("Error fetching forecast data", (error as Error).message);
      }
    };

    fetchForecast();
  }, [selectedLocation]);

  // useEffect( () => {}), [weatherData];



  return(
      <div className="row border rounded ms-0 me-0 mb-5 contentBox ">
        {/* <div className="col-xl-1 t"></div> */}
        
        <div className="col-5 pt-3 pb-4 ms-0 border-end border-1 border-light">
          
          {weatherData ? (
            <div className = "text-center">
              <h2 className="display-3 mb-0"> 
                {Math.round(weatherData.list[0].main.temp)}<sup>°C</sup> 
              </h2>
              <p>{`Feels like ${Math.round(weatherData.list[0].main.feels_like)}`}°C</p>
              <h3 className="fs-4 text-info">
                {`${selectedLocation?.name}, ${selectedLocation?.country}`}
              </h3>
              {`Humidity: ${weatherData.list[0].main.humidity}%`} 
            </div>
            ) : (<div>Loading weather from openweather...</div>)
          }
          
        </div>

        <div className="col pt-3 pb-2 ms-0 me-0">
          
          {weatherData ? (
            <div className = "text-center mt-4 mb-2">
              <h2 className= "fs-2 mb-3"> 
                {(`icon here`)}
              </h2>
              
              <h3 className="fs-5 pb-2">
                {`${weatherData.list[0].weather[0].description}`}
              </h3>

              <p className="mb-0 pb-0 mt-3"> {`Min: ${Math.round(weatherData.list[0].main.temp_min)}°C`}  </p>
              <p className="mb-0 pb-0"> {`Max: ${Math.round(weatherData.list[0].main.temp_max)}°C`}  </p>
                            
            </div>
            ) : (<div>Loading...</div>)
          }
          
        </div>


        {/* <div className="col-xl-1"></div> */}
      </div>
  )

}

export default Weather;

//useEffect starting around line 17 works by executing what is in side, each time the state of the item passed after the end comma changes ("selectedLocation" in this case)
//conditional rendering occurs with the use of  { data ? (do this) : (if not do this)}