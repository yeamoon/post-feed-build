import React from 'react';
import '../Styles/SortingAndFiltering.css'; // Importing the CSS file

function SortingAndFiltering({ sortingOption, setSortingOption, filteringOption, setFilteringOption }) {
  return (
    <div className="controls">
      <label>Sort by:</label>
      <select onChange={(e) => setSortingOption(e.target.value)} value={sortingOption}>
        <option value="name">Name</option>
        <option value="created">Date Created</option>
      </select>

      <label>Filter by Status:</label>
      <select onChange={(e) => setFilteringOption(e.target.value)} value={filteringOption}>
        <option value="">All</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
}

export default SortingAndFiltering;
