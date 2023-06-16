import React, {useState, ChangeEvent, useEffect, useRef} from "react";

import styles from '../App.css';
import locations from "../assets/locations";
import { FaSearch } from "react-icons/fa";
import config from "../config";
import SearchResults from "./SearchResults";
import { CityObject } from "./types";

interface SearchBarProps {
    setFilteredCities: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchBar = ({setFilteredCities} : SearchBarProps) => {
    const[input, setInput] = useState("");
    const[searchResults, setSearchResults] = useState <CityObject[]>([]);
    const searchContainerRef = useRef<HTMLDivElement>(null);


    //Geocoding API - max 60 calls per minute, max 1000 a day
    const fetchData = async (value: string) => { 
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Toronto&limit=5&appid=${config.apiKey}`)
            const data = await response.json();
            console.log (data);
        }
        catch (error){
            console.error('Error fetching search results', error);
        }
    };

    
    type CityMapping = Record<string, string[]>;  
      
    function filterCities(locations: CityMapping, input: string): CityObject[] { 
        const filteredCities: CityObject[] = [];
      
        Object.entries(locations).forEach(([country, cityList]) => {
          const filteredCityList = cityList.filter(city => city.toLowerCase().startsWith(input));
            filteredCityList.forEach(  city => {filteredCities.push({ city, country })}  );
        });
        
        setFilteredCities(filteredCities); //updates state
        return filteredCities;
        
    }


    const handleSearchChange = (eventTargetValue: string) => {
        setInput(eventTargetValue);
        console.log(`handleChange function called with with passed search query of ${eventTargetValue.toLowerCase()} and eventTargetValue.length is ${eventTargetValue.length}`)

        if (eventTargetValue.length <= 1) {
            setSearchResults([]);
            return;
          }
      
          if (eventTargetValue.length > 1) {
            const filteredCities = filterCities(
              locations as CityMapping,
              eventTargetValue.toLowerCase()
            );
            setSearchResults(filteredCities);
          }
       
        // fetchData(value) 
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
          searchContainerRef.current &&
          !searchContainerRef.current.contains(event.target as Node)
        ) {
          setSearchResults([]);
        }
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {document.removeEventListener("mousedown", handleClickOutside);};
      }, []);


    useEffect(() => {console.log(searchResults);}, [searchResults]);

    return (
        <>
            <div ref={searchContainerRef} className="search-bar-container">
                <form>
                    <div className="form-group d-flex align-items-center">
                        {/* <label htmlFor="formGroupExampleInput"></label> */}
                        <input type="text" id="searchInput" autoComplete="off" className="form-control text-center" value={input} onChange={ (e) => handleSearchChange(e.target.value) } placeholder="Search for location"/>
                        <FaSearch type="submit" className="ms-2 me-2"></FaSearch>  
                    </div>
                </form>

                {searchResults.length > 0 && (<SearchResults filteredResults={searchResults} />)}
            </div>
                
        </>
    );
};

export default SearchBar;