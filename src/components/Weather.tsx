import { useEffect, useState } from "react";
import styles from '../App.css';
import config from "../config"
import { Location } from "./types";


interface WeatherProps {
  selectedLocation: Location | null;

}


const Weather = ( {selectedLocation }: WeatherProps) => 
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
        <div className="col-xl-1 t"></div>
        <div className="col pt-3 pb-5 ms-4">
          
          {weatherData ? (
            <>
              <h2 className="display-3"> 
              {Math.round(weatherData.list[0].main.temp)} <span><sup>°C</sup></span> 
              </h2>
              <h3 className="fs-4">{`${selectedLocation?.name}, ${selectedLocation?.country}`}</h3>
              blah blah blah blah 
            </>
            ) : (<div>Loading weather from openweather...</div>)
          }
          
        </div>
        <div className="col-xl-1"></div>
      </div>
  )

}

export default Weather;

//useEffect starting around line 17 works by executing what is in side, each time the state of the item passed after the end comma changes ("selectedLocation" in this case)
//conditional rendering occurs with the use of  { data ? (do this) : (if not do this)}