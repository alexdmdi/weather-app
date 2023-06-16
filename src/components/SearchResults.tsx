interface SearchResultsProps {
    filteredResults: { city: string; country: string }[];
}

const SearchResults = ( {filteredResults} : SearchResultsProps) => {
    return (
        <div className="search-results mt-2">
          <ul className="list-group contentBox">
            {filteredResults.map((result, index) => (
              <li key={index} onClick={() => {}} className="list-group-item list-group-item-action fs-6">
                {`${result.city}, ${result.country}`}
              </li>
            ))}
          </ul>
        </div>
      );

}

export default SearchResults;