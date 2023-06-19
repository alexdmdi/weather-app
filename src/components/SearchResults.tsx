import config from "../config";
import { Location } from "./types"

interface SearchResultsProps {
    filteredLocations: Location[];
    onLocationSelect: (location: Location) => void 
}


const SearchResults = ( {filteredLocations, onLocationSelect} : SearchResultsProps) => {

    return (
        <div className="search-results mt-2">
          <ul className="list-group contentBox">
            {filteredLocations.map((location, index) => (
              <li key={index} onClick={(e) => onLocationSelect(location)} className="list-group-item list-group-item-action fs-6">
                 {`${location.name}${location.state ? `, ${location.state}` : ""}, ${location.country}`}
              </li>
            ))}
          </ul>
        </div>
      );

}

export default SearchResults;