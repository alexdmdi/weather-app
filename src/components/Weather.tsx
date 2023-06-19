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

      try {
        console.log(` location id is: ${selectedLocation.id}`)
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${selectedLocation.id}&appid=${config.apiKey}&units=metric`);
        console.log ('Weather response', weatherResponse);
        
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

    return(
        <div className="row border rounded ms-0 me-0 mb-5 contentBox ">
          <div className="col-xl-1 t"></div>
          <div className="col pt-3 pb-5 ">
            <h2 className="display-3">18c</h2>
            <h3 className="fs-4">Toronto, Ontario</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nesciunt 
          quia reiciendis nihil neque ex, omnis maxime, tempora similique fuga aliquid quibusdam aperiam 
          hic ullam delectus enim alias aliquam, nisi facilis unde consequatur voluptatum quae nobis? Consequuntur
          </div>
          <div className="col-xl-1"></div>
        </div>

    )

}

export default Weather;