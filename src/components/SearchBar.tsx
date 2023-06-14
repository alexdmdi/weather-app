import React, {useState, ChangeEvent} from "react";
import { useEffect } from 'react';

import styles from '../App.css';
import locations from "../assets/locations";
import { FaSearch } from "react-icons/fa";
import config from "../config";

//import {filterCities} from "./filterCities";
import SearchResults from "./SearchResults";

interface SearchBarProps {
    setFilteredCities: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchBar = ({setFilteredCities} : SearchBarProps) => {
    const[input, setInput] = useState("");
    const[searchResults, setSearchResults] = useState <CityObject[]>([]);

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


    interface CityObject {
        country: string;
        city: string;
    }
    type CityMapping = Record<string, string[]>;  
      
    function filterCities(locations: CityMapping, input: string): CityObject[] { /*used to be CityObject[] instead of 'void'*/
        const filteredCities: CityObject[] = [];
      
        Object.entries(locations).forEach(([country, cityList]) => {
          const filteredCityList = cityList.filter(city => city.toLowerCase().startsWith(input));
            filteredCityList.forEach(  city => {filteredCities.push({ city, country })}  );
        });
        
        setFilteredCities(filteredCities); //updates state
        return filteredCities;
        
    }


    const handleSearchChange = (value: string) => {
        setInput(value)
        console.log(`handleChange function is now called with with passed search query of ${value.toLowerCase()}`)
        
        if (value.length > 1) {
            const filteredCities = filterCities(locations, value.toLowerCase())
            
            setSearchResults(filteredCities);

            if  
                return <SearchResults filteredResults={filteredCities} />;
            

        }
        if (value.length === 0) {
            return null;
        }

        // fetchData(value) 
    }

    useEffect(() => {console.log(searchResults);}, [searchResults]);

    return (
        <>
            <form>
                <div className="form-group d-flex align-items-center">
                    {/* <label htmlFor="formGroupExampleInput"></label> */}
                    <input type="text" id="searchInput" autoComplete="off" className="form-control text-center" value={input} onChange={(e) => handleSearchChange(e.target.value)} placeholder="Search for location"/>
                    <FaSearch type="submit" className="ms-2 me-2"></FaSearch>  
                </div>
            </form>
            
        
        </>
    )
}

export default SearchBar;