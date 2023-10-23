import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (searchQuery: string) => {
    onSearch(searchQuery);
  };

  return (
    <div className="crypto-search">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) =>{
          setSearchQuery(e.target.value)
          handleSearch(e.target.value);}}
      />
    </div>
  );
};

export default Search;
