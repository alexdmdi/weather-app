import { useEffect, useState } from "react";
import styles from '../App.css';
import config from "../config"
import { Location } from "./types";

interface WeatherProps {
  selectedLocation: Location | null | undefined;  //specifies that selecedLocation may be null or undefined, not just of type Location
  updateForecastData: (data: object) => void; //specifies that updateWeatherData is a function that takes an object as an argument and returns nothing
}

const Weather = ({ selectedLocation, updateForecastData }: WeatherProps) => {
  const [forecastData, setForecastData] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [currWeatherIcon, setCurrWeatherIcon] = useState<string>("");
  const [currLocation, setCurrLocation] = useState<{ lat: number; lon: number, city: string, regionCode: string, countryName: string } | null>(null);

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

      const currIconCode = currentWeatherData.weather[0].icon;
      const currIconURL: string = `https://openweathermap.org/img/wn/${currIconCode}@2x.png`;
      setCurrWeatherIcon(currIconURL);

      // Fetch forecast data
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${locationId ? `id=${locationId}` : `lat=${latitude}&lon=${longitude}`}&appid=${config.apiKey}&units=metric`);
      if (!forecastResponse.ok) {
        throw new Error('Forecast data request failed');
      }
      const forecastData = await forecastResponse.json();
      console.log('Forecast data:', forecastData);
      setForecastData(forecastData);
      updateForecastData(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    const getUserCoordinates = async () => {
      try {
        const response = await fetch(`https://ipapi.co/json`);
        const data = await response.json();
        console.log(data);
        const currUserData = { lat: data.latitude, lon: data.longitude, city: data.city, regionCode: data.region_code, countryName: data.country_name };
        return currUserData;
      } catch (error) {
        console.log('Error getting info from ipapi.com:', error);
        return null;
      }
    };

    const initializeWeatherData = async () => {
      const coordinates = await getUserCoordinates();
      if (coordinates) {
        setCurrLocation(coordinates);
        fetchWeatherData(coordinates.lat, coordinates.lon);
      }
    };

    initializeWeatherData();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(0, 0, selectedLocation.id);
    }
  }, [selectedLocation]);


// const Weather = ( {selectedLocation, updateForecastData }: WeatherProps) => 
// {
//   const [forecastData, setForecastData] = useState<any>(null);
//   const [currentWeather, setCurrentWeather] = useState<any>(null);
//   const [currWeatherIcon, setCurrWeatherIcon] = useState<string>("");
//   const [currLocation, setCurrLocation] = useState< {lat: number; lon: number } | null>(null);


//   useEffect( ()=> {
//     async function getUserInfo() {
//       try {
//         const response = await fetch(`https://ipapi.co/json`)
//         const data = await response.json();
//         console.log(data);
//         const currCoordinates = {"lat": data.latitude , "lon": data.longitude};
//         return currCoordinates;
//       }
//       catch {
//         console.log(`Error getting info from ipapi.com`)
//       }
       
//     }
      
//     const coordinates = getUserInfo();
//     setCurrLocation(coordinates);
//     console.log(currLocation);
    
//     useEffect( () => {
    
//       const fetchCurrentWeather = async () => {
//         if(!currLocation) return;
      
//         //fetch current weather data for particular city
//         try {
//           console.log(`Coordinates for current location, Lat: ${currLocation.Lat} Lon: ${currLocation.Lon} `);
//           const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currLocation.lat}&lon=${currLocation.lon}&appid=${config.apiKey}&units=metric`);

//           if (!currentWeatherResponse.ok){
//             throw new Error('Weather data request failed');
//           }
        
//           const currResponseData = await currentWeatherResponse.json();
//           console.log ('Current Weather data:', currResponseData)
//           setCurrentWeather(currResponseData); 
        
//           const currIconCode = currResponseData.weather[0].icon; //to be used to display appropiate icon for current weather
//           const currIconURL: string = `https://openweathermap.org/img/wn/${currIconCode}@2x.png`
//           setCurrWeatherIcon(currIconURL);

//         } 
//         catch (error) {
//           console.error("Error fetching current Weather data", (error as Error).message);
//         }
//     };
    
//     const fetchForecast = async () => {
//       if (!currLocation) return;
    
//       //fetch forecast data for selected city
//       try {
//         console.log(`Coordinates for current location, Lat: ${currLocation.lat} Lon: ${currLocation.lon} `)
//         const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${currLocation.lat}&lon=${currLocation.lon}&appid=${config.apiKey}&units=metric`);
        
//         if (!weatherResponse.ok){
//           throw new Error('Forecast data request failed');
//         }
//         const forecastData = await weatherResponse.json();
//         console.log ('Forecast data:', forecastData)
//         setForecastData(forecastData); 
//         updateForecastData(forecastData);
        
//       } 
//       catch (error) {
//         console.error("Error fetching forecast data", (error as Error).message);
//       }
//     };
    
//     fetchCurrentWeather();
//     fetchForecast();
    
//     }, [currLocation]); // empty dependency array at the end so it runs only once on mount (on page load)


//   }, [])

//   //display current weather and forecast for auto-detected use locale


  
//   useEffect(() => {
//     const fetchCurrentWeather = async () => {
//       if(!selectedLocation) return;

//       //fetch current weather data for particular city
//       try {
//         console.log(`Location id for current weather is: ${selectedLocation.id}`)
//         const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${selectedLocation.id}&appid=${config.apiKey}&units=metric`);
        
//         if (!currentWeatherResponse.ok){
//           throw new Error('Weather data request failed');
//         }

//         const currResponseData = await currentWeatherResponse.json();
//         console.log ('Current Weather data:', currResponseData)
//         setCurrentWeather(currResponseData); 

//         const currIconCode = currResponseData.weather[0].icon; //to be used to display appropiate icon for current weather
//         const currIconURL: string = `https://openweathermap.org/img/wn/${currIconCode}@2x.png`
//         setCurrWeatherIcon(currIconURL);
        
//       } 
//       catch (error) {
//         console.error("Error fetching current Weather data", (error as Error).message);
//       }
//     };
    
//     const fetchForecast = async () => {
//       if (!selectedLocation) return;

//       //fetch forecast data for selected city
//       try {
//         console.log(`Location id for forecast fetch: ${selectedLocation.id}`)
//         const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${selectedLocation.id}&appid=${config.apiKey}&units=metric`);
        
//         if (!weatherResponse.ok){
//           throw new Error('Forecast data request failed');
//         }
//         const forecastData = await weatherResponse.json();
//         console.log ('Forecast data:', forecastData)
//         setForecastData(forecastData); 
//         updateForecastData(forecastData);
        
//       } 
//       catch (error) {
//         console.error("Error fetching forecast data", (error as Error).message);
//       }
//     };

//     fetchCurrentWeather();
//     fetchForecast();
//   }, [selectedLocation]);


  return(
      <div className="row border rounded ms-0 me-0 mb-5 contentBox ">
        
        
        <div className="col-5 d-flex align-items-center justify-content-center border-end border-light">
          
          {currentWeather ? (
            <div className = "text-center">
              <h2 className="display-3 mb-0"> 
                {Math.round(currentWeather.main.temp)}<sup>°C</sup> 
              </h2>
              <p>{`Feels like ${Math.round(currentWeather.main.feels_like)}`}°C</p>
              <h3 className="fs-5 pt-2 text-info">
                {`${currLocation ? `${currLocation.city} ${currLocation.regionCode? `${currLocation.regionCode}` : ""}, ${currLocation.countryName}` : `${selectedLocation?.name}, ${selectedLocation?.country}`}`}
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

//useEffect works by executing what is in side, each time the state of the item passed after the end comma changes ("selectedLocation" in this case)
//conditional rendering occurs with the use of  { data ? (do this) : (if not do this)}