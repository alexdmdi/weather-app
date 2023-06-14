// import filterCities from "./SearchBar";
import React from "react";
import { v4 as uuid } from "uuid";

interface CityObject {
    country: string;
    city: string;
  }

interface SearchResultsProps {
    filteredResults: CityObject[];
}

const SearchResults = ( {filteredResults} : SearchResultsProps) => {
    return (
        <>
            <div className="list-group results-list contentBox">
                {/* <div className="list-group-item">Toronto, ON</div> */}
                
                {
                filteredResults.map((location) => <li key={uuid()} onClick={() => {}} className="list-group-item"> { `${location.city}, ${location.country}`}  </li>)
                }

            </div>
        </>
    )
}

export default SearchResults;