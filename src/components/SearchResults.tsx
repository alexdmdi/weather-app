import { Location } from "./types"

interface SearchResultsProps {
    searchResults: Location[];
    onLocationSelect: (location: Location) => void 
}

//st = state

const SearchResults = ( {searchResults, onLocationSelect} : SearchResultsProps) => {
  return (
        <div className="search-results mt-2">
          <ul className="list-group contentBox">
            {searchResults.map((location, index) => (
              <li key={index} onClick={() => onLocationSelect(location)} className="list-group-item list-group-item-action fs-6">
                 {`${location.name}${location.st ? `, ${location.st}` : ""}, ${location.country}`}
              </li>
            ))}
          </ul>
        </div>
  );

}

export default SearchResults;