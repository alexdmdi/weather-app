import { useEffect, useState } from "react";
import config from "../config"
import { Location } from "./types";

interface WeatherProps {
  selectedLocation: Location | null | undefined;  //specifies that selecedLocation may be null or undefined, not just of type Location
  updateForecastData: (data: object) => void; //specifies that updateWeatherData is a function that takes an object argument, and returns nothing
}

interface CurrentLocation {
  lat: number;
  lon: number;
  city: string;
  regionCode: string;
  countryName: string;
}

const Weather = ({ selectedLocation, updateForecastData }: WeatherProps) => {
  const [forecastData, setForecastData] = useState<any>(null); //forecastData is set here, but so it can be ultimately used in futureforecast.tsx
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [currWeatherIcon, setCurrWeatherIcon] = useState<string>("");
  const [currLocation, setCurrLocation] = useState<CurrentLocation | null>(null);

  // console.log(`TTTTTTTTTT ${selectedLocation}`);
  //On mount/page load: uses ipApi.co to get users approximate coordinates, so current weather and forecast data can then be fetched for user location
  useEffect(() => {
    // console.log(`----------------------`)
    const getUserLocation = async () => {
      try {
        const response = await fetch(`https://ipapi.co/json`);
        const data = await response.json();
        console.log(data);
        const currUserData = { lat: data.latitude, lon: data.longitude, city: data.city, regionCode: data.region_code, countryName: data.country_name };
        return currUserData;
      } 
      catch (error) {
        console.log('Error fetching from ipapi.com:', error);
        return null;
      }
    };

    const initializeWeatherData = async () => {
      const userLocation = await getUserLocation();
      if (userLocation) {
        setCurrLocation(userLocation);
        fetchWeatherData(userLocation.lat, userLocation.lon);
      }

      if (selectedLocation !== null && selectedLocation !==undefined) {
        console.log(`selected location is: ${selectedLocation}`)
        fetchWeatherData(0, 0, selectedLocation.id);
      }
    };

    initializeWeatherData();

  }, [selectedLocation]);


  //fetch current weather and forecast using different fetch URLs depending on if a location is provided, otherwise uses current user coordinates
  const fetchWeatherData = async (latitude: number, longitude: number, locationId?: number) => {
    try {
      // Fetch current weather data
      const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?${locationId ? `id=${locationId}` : `lat=${latitude}&lon=${longitude}`}&appid=${config.apiKey}&units=metric`);
      if (!currentWeatherResponse.ok) {
        throw new Error('Weather data request failed');
      }
      const currentWeatherData = await currentWeatherResponse.json();
      console.log('Current Weather data:', currentWeatherData);
      setCurrentWeather(currentWeatherData); 

      //Set current weather icon based on the API response icon code
      const currIconCode = currentWeatherData.weather[0].icon;
      const currIconURL: string = `https://openweathermap.org/img/wn/${currIconCode}@2x.png`;
      setCurrWeatherIcon(currIconURL);

      //Fetch forecast data
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${locationId ? `id=${locationId}` : `lat=${latitude}&lon=${longitude}`}&appid=${config.apiKey}&units=metric`);
      if (!forecastResponse.ok) {
        throw new Error('Forecast data request failed');
      }
      const forecastData = await forecastResponse.json();
      console.log('Forecast data response:', forecastData);
      setForecastData(forecastData);
      updateForecastData(forecastData); //to be passed on to app.tsx then to futureforecast.tsx
    } 
    catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };


  return(
      <div className="row border rounded ms-0 me-0 mb-5 contentBox ">
        
        <div className="col-5 d-flex align-items-center justify-content-center border-end border-light weatherSummary">
          
          {currentWeather ? (
            <div className = "text-center">
              <h2 className="display-3 mb-0"> 
                {Math.round(currentWeather.main.temp)}<sup>°C</sup> 
              </h2>
              <p>{`Feels like ${Math.round(currentWeather.main.feels_like)}`}°C</p>
              <h3 className="fs-5 pt-2 text-info locationText">
                {`${selectedLocation? `${selectedLocation?.name}, ${selectedLocation?.country}`  :  `${currLocation? `${currLocation.city} ${currLocation.regionCode? `${currLocation.regionCode}` : ""}, ${currLocation.countryName}` : `${'null'}` }` }`}
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

              <p className="mb-0 pb-0 mt-2"> {`Min: ${Math.floor(currentWeather.main.temp_min)}°C`}  </p>
              <p className="mb-0 pb-3"> {`Max: ${Math.round(currentWeather.main.temp_max)}°C`}  </p>
                            
            </div>
            ) : (<div></div>)
          }
          
        </div>

      </div>
  )

}

export default Weather;

//useEffect works by executing what is in side, each time the state of the item passed after the end comma changes ("selectedLocation" in this case)
//conditional rendering occurs with the use of  { data ? (do this) : (if not do this)}