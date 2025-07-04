import React, {useState, useEffect, useRef} from "react";

import locations from "../assets/locations";
import { FaSearch } from "react-icons/fa";
import SearchResults from "./SearchResults";
import { Location } from "./types";

interface SearchBarProps {
    setFilteredLocations: React.Dispatch<React.SetStateAction<Location[]>>;
    onLocationSelect: (location: Location) => void;
}

const SearchBar = ({onLocationSelect} : SearchBarProps) => {
    const[input, setInput] = useState("");
    const[searchResults, setSearchResults] = useState <Location[]>([]);
    const searchContainerRef = useRef<HTMLDivElement>(null);
      
    function filterLocations(locations: Location[], input: string): Location[] { 
        const filteredLocations: Location[] = locations.filter(location => location.name.toLowerCase().startsWith(input.toLowerCase()));
        return filteredLocations;
    }


    const handleSearchChange = (eventTargetValue: string) => {
        setInput(eventTargetValue);
        // console.log(`handleChange function called with with passed search query of ${eventTargetValue.toLowerCase()} and eventTargetValue.length is ${eventTargetValue.length}`)

        if (eventTargetValue.length <= 1) {
          setSearchResults([]);
          return;
        }
      
        //if input is more than 1 character, invoke filteredLocations functions and store value in a const, then update searchResults hook
        if (eventTargetValue.length > 1) {
          const filteredLocations = filterLocations(locations, eventTargetValue.toLowerCase());
          setSearchResults(filteredLocations);
        } 
    }

    const handleLocationSelect = (location: Location) => {
      console.log(location.name, location.country);
      onLocationSelect(location)// pass selected location to parent component
      setSearchResults([]); //empties search results list, which also makes it dissapear once a search result is pressed
      setInput(""); //clears form on submit
    }

    //makes results list dissapear on outside focus
    const handleClickOutside = (event: MouseEvent) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
          setSearchResults([]); 
        }
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {document.removeEventListener("mousedown", handleClickOutside);};
      }, []);


      const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault(); //prevents default form submission
      }
    
    
      //logs search results that should appear in pop up list
    // useEffect(() => {console.log(searchResults);}, [searchResults]);

    //input form
    return (
        <>
            <div ref={searchContainerRef} className="search-bar-container">
                <form onSubmit = {handleFormSubmit}>
                    <div className="form-group d-flex align-items-center">
                        {/* <label htmlFor="formGroupExampleInput"></label> */}
                        <input type="text" id="searchInput" autoComplete="off" className="form-control text-center" value={input} onChange={ (e) => handleSearchChange(e.target.value) } placeholder="Search for location"/>
                        <FaSearch type="submit" className="ms-2 me-2"></FaSearch>  
                    </div>
                </form>

                {searchResults.length > 0 && (<SearchResults searchResults={searchResults} onLocationSelect={handleLocationSelect} />)}
            </div>
                
        </>
    );
};

export default SearchBar;