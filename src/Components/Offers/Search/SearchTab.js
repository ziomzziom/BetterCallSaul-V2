import React from "react";

const SearchTab = ({ searchResults }) => {
  return (
    <div>
      <h2>Search Results:</h2>
      {searchResults.map((result) => (
        <p key={result.id}>{result.title}</p>
      ))}
    </div>
  );
};

export default SearchTab;
