import config from "../config";
import { Location } from "./types"


interface SearchResultsProps {
    filteredLocations: Location[];
    // onCityClick: (city: CityObject) => void;
}


function handleClick(location: Location){
  console.log(location.name); //prints Toronto for example, in console if that's what is pressed on
  //fetchLocations(location);
  fetchForeCast(location)
}

//Geocoding API - max 60 calls per minute, max 1000 a day
const fetchLocations = async (location: Location) => { 
  try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location.name}&limit=5&appid=${config.apiKey}`)
      const data = await response.json();
      console.log('Fetch Data response: ');
      console.log (data);
      fetchForeCast(location);
  }
  catch (error){
      console.error('Error fetching search results');
  }
};

//Tries to fetch 5 day forecast from openweather
const fetchForeCast = async (location: Location) =>{
  try {
      console.log(` location id is: ${location.id}`)
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${location.id}&appid=${config.apiKey}&units=metric`);
      const weatherData = await weatherResponse.json();
      console.log (weatherData);

      if (!weatherResponse.ok){
        throw new Error('Weather data request failed');
      }
  }

  catch (error){
    console.error('Error fetching forecast data', (error as Error).message);
  }


}

const SearchResults = ( {filteredLocations} : SearchResultsProps) => {

    return (
        <div className="search-results mt-2">
          <ul className="list-group contentBox">
            {filteredLocations.map((location, index) => (
              <li key={index} onClick={(e) => {handleClick(location)}} className="list-group-item list-group-item-action fs-6">
                 {`${location.name}${location.state ? `, ${location.state}` : ""}, ${location.country}`}
              </li>
            ))}
          </ul>
        </div>
      );

}

export default SearchResults;