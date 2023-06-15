import React, {useState, ChangeEvent, useRef} from "react";
import { useEffect } from 'react';

import styles from '../App.css';
import locations from "../assets/locations";
import { FaSearch } from "react-icons/fa";
import config from "../config";
import SearchResults from "./SearchResults";

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


    interface CityObject {
        country: string;
        city: string;
    }
    
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
        setInput(eventTargetValue)
        console.log(`handleChange function called with with passed search query of ${eventTargetValue.toLowerCase()} and eventTargetValue.length is ${eventTargetValue.length}`)

        // if (eventTargetValue.length <= 1) {
        //     console.log('should return search results with empty array passed as prop')
        //     setSearchResults([]);
        //     return <SearchResults filteredResults={searchResults} />;
        // }
        
        if (eventTargetValue.length > 1) {
            const filteredCities = filterCities(locations, eventTargetValue.toLowerCase())
            
            setSearchResults(filteredCities);
            console.log(`filteredCities is: ${filteredCities}`)
            return <SearchResults filteredResults={filteredCities} />;
        }
        else {
            setSearchResults([]);
            return <SearchResults filteredResults={searchResults} />;
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
    
    

    useEffect(() => {console.log(searchResults);}, [searchResults]);

    return (
        <>
            <div ref={searchContainerRef}>
                <form>
                    <div className="form-group d-flex align-items-center">
                        {/* <label htmlFor="formGroupExampleInput"></label> */}
                        <input type="text" id="searchInput" autoComplete="off" className="form-control text-center" value={input} onChange={ (e) => handleSearchChange(e.target.value) } placeholder="Search for location"/>
                        <FaSearch type="submit" className="ms-2 me-2"></FaSearch>  
                    </div>
                </form>
                
            </div>
            
            
        
        </>
    )
}

export default SearchBar;