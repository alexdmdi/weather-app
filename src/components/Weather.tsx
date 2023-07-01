import { useEffect, useState } from "react";
import { Location } from "./types";
import date from 'date-and-time';

interface WeatherProps {
  selectedLocation: Location | null | undefined;  //specifies that selecedLocation may be null or undefined, not just of type Location
  updateForecastData: (data: object) => void; //specifies that updateWeatherData is a function that takes an object argument, and returns nothing
  updateTheme: (theme: boolean) => void; //specifies that updateTheme is a function that takes an object argument, and returns nothing
}

interface CurrentLocation {
  lat: number;
  lon: number;
  city: string;
  regionCode: string;
  countryName: string;
}

const Weather = ({ selectedLocation, updateForecastData, updateTheme}: WeatherProps) => {
  const [forecastData, setForecastData] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [currWeatherIcon, setCurrWeatherIcon] = useState<string>("");
  const [currLocation, setCurrLocation] = useState<CurrentLocation | null>(null);
  const [sunrise_sunset, setSunrise_SunSet] = useState< {"sunrise" : Date , "sunset" : Date}>();

  //On mount/page load: uses ipApi.co to get users approximate coordinates, so current weather and forecast data can then be fetched for user location
  //Then any time selectedLocation updates, triggers a re-render that should initiate fetch of current weather and forecast
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await fetch(`https://ipapi.co/json`);
        const data = await response.json();
        // console.log(data);
        const currUserData = { lat: data.latitude, lon: data.longitude, city: data.city, regionCode: data.region_code, countryName: data.country_name };
        return currUserData;
      } 
      catch (error) {
        console.log('Error fetching from ipapi.com:', error);
        return null;
      }
    };

    if (selectedLocation) {
      console.log(`selected location is: `, selectedLocation)
      fetchWeatherData(0, 0, selectedLocation.id);
    }
    else {
      const initializeWeatherData = async () => {
        const userLocation = await getUserLocation();
        if (userLocation) {
          setCurrLocation(userLocation);
          fetchWeatherData(userLocation.lat, userLocation.lon);
        }
  
      };
      initializeWeatherData();
    }

  }, [selectedLocation]);


  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Data request failed');
    }
    return response.json();
  };

  //fetch current weather and forecast using different fetch URLs depending on if a location is provided, otherwise uses current user coordinates
  const fetchWeatherData = async (latitude: number, longitude: number, locationId?: number) => {
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?${locationId ? `id=${locationId}` : `lat=${latitude}&lon=${longitude}`}&appid=${import.meta.env.VITE_APIKEY}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?${locationId ? `id=${locationId}` : `lat=${latitude}&lon=${longitude}`}&appid=${import.meta.env.VITE_APIKEY}&units=metric`;
    
    try {
      const [currentWeatherData, forecastData] = await Promise.all([fetchData(currentWeatherURL), fetchData(forecastURL)]);
      console.log(`Current weather response: `,currentWeatherData)
      console.log(`Forecast Data response: `,forecastData)

      setCurrentWeather(currentWeatherData);

      setForecastData(forecastData);
      updateForecastData(forecastData); //to be passed on to app.tsx, which then goes to futureforecast.tsx

      //get sunrise and sunset to then determine if it is day or night for the selected location
      const sunriseDateObj = new Date(currentWeatherData.sys.sunrise*1000 + new Date().getTimezoneOffset()*60000 + currentWeatherData.timezone*1000);
      const sunsetDateObj = new Date(currentWeatherData.sys.sunset*1000 + new Date().getTimezoneOffset()*60000 + currentWeatherData.timezone*1000);
      setSunrise_SunSet({"sunrise" : sunriseDateObj, "sunset" : sunsetDateObj})
    
      const userDateObj = new Date();
      const selectedLocation_DateObj = new Date (userDateObj.getTime() + userDateObj.getTimezoneOffset()*60000 + currentWeatherData.timezone*1000);
      console.log (`selectedLocation_DateObj: `, selectedLocation_DateObj.toLocaleString());
      if (selectedLocation_DateObj > sunriseDateObj && selectedLocation_DateObj < sunsetDateObj){
         updateTheme(true) //true: day theme (to be passed to app.tsx to set location-based day/night theme)
      }
      else {
        updateTheme(false) //false: night theme (to be passed to app.tsx to set location-based day/night theme)
      }

      //Set current weather icon based on the API response icon code
      const currIconCode = currentWeatherData.weather[0].icon;
      const currIconURL: string = `https://openweathermap.org/img/wn/${currIconCode}@2x.png`;
      setCurrWeatherIcon(currIconURL);
    }
    catch (error){
      console.error('Error fetching weather data:', error);
    }

  };
   

  return(
      <div className="row border rounded ms-0 me-0 mb-5 contentBox ">
        
        <div className="col-5 d-flex align-items-center justify-content-center border-end border-light weatherSummary">
          
          {currentWeather ? (
            <div className = "text-center">
              <h2 className="display-3 mb-0 mt-2"> 
                {Math.round(currentWeather.main.temp)}<sup>°C</sup> 
              </h2>
              <p className="mb-0 pb-0">{`Feels like ${Math.round(currentWeather.main.feels_like)}`}°C</p>
              <p className="mt-0 mb-0 pt-0 pb-0"> 
                {`Humidity: ${currentWeather.main.humidity}%`} 
              </p>
              <h3 className="fs-5 pt-3 text-info locationText">
                {`${selectedLocation? `${selectedLocation?.name}, ${selectedLocation?.country}`  :  `${currLocation? `${currLocation.city} ${currLocation.regionCode? `${currLocation.regionCode}` : ""}, ${currLocation.countryName}` : `${'null'}` }` }`}
              </h3>
              <p className="mb-3">
                {currentWeather? `   Local time ${date.format(new Date(new Date().getTime() + new Date().getTimezoneOffset()*60000 + currentWeather.timezone*1000), 'hh:mm A' )}` : "Local time: N/A"}
              </p>
              
            </div>
            ) : (<div>Loading weather from openweather...</div>)
          }
          
        </div>

        <div className="col pt-3 pb-3 ms-0 me-0 align-self-center ps-4 pe-4 p-sm-3">
          
          {currentWeather ? (
            <div className = "row">

              <div className="col text-center mt-0">
                <h2 className= "weatherIcon fs-2 d-inline "> 
                  <img src={currWeatherIcon} alt="weather icon" className="mb-0 pb-0 weatherIcon"/>
                </h2>

                <div className="fs-4 pb-0 text-capitalize weatherDescription mb-3">
                  {`${currentWeather.weather[0].description}`}
                </div>

              </div>

              <div className="col align-self-center text-center mt-3 mb-3 ">    
                <p className="fs-5 mb-0 ps-0 d-inline">Max:</p>
                <p className="mb-0 pb-0"> {`${Math.round(currentWeather.main.temp_max)}°C`}  </p>
                
                <p className="fs-5 mb-0 ps-0">Min:</p>
                <p className="mb-0"> {`${Math.floor(currentWeather.main.temp_min)}°C`}  </p>  
              </div>

              <div className="col align-self-center text-center mt-3 mb-3">
                <p className="fs-5 mb-0 pe-2">Sunrise:</p>
                <p className="mb-0 pb-0"> {`${sunrise_sunset? date.format(sunrise_sunset.sunrise, 'hh:mm A'): "N/A"} `}  </p>
                <p className="fs-5 mb-0 pe-2">Sunset:</p>
                <p className="mb-0"> {`${sunrise_sunset? date.format(sunrise_sunset.sunset, 'hh:mm A') : "N/A"}` }  </p>
              </div>
                            
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