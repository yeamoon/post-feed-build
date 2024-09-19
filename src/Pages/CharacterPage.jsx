import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard'; // Import the  CharacterCard component
import SortingAndFiltering from './SortingAndFiltering';  // Import the  SortingAndFiltering component
import ErrorMessage from './ErrorMessage';  // Import the  ErrorMessage component
import PaginationControls from './PaginationControls'; // Import the  PaginationControls component


function CharacterPage() {
  const [characterList, setCharacterList] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [filteredCharacters, setFilteredCharacters] = useState([]); 
  const [sortingOption, setSortingOption] = useState('name');  //sorting option "Name" or "Date Created"
  const [filteringOption, setFilteringOption] = useState(''); // Filtering option "All", "Alive", "Dead", Unknown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPages, setMaxPages] = useState(1); // Max pages based on filtered results

  // Fetching characters based on filtering option and page
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}&status=${filteringOption}`
        );
        setCharacterList(response.data.results);
        setMaxPages(response.data.info.pages); // Setting max pages based on the filtered data
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchCharacters(); // Fetching characters when page or filtering changes
  }, [page, filteringOption]); 

  // Apply sorting and filtering after fetching data
  useEffect(() => {
    const sortCharacters = (characters, sortingOption) => {
      if (sortingOption === 'name') {
        return [...characters].sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
      }else if (sortingOption === 'created') {
        // Sorting by creation date, newest to oldest
        return [...characters].sort((a, b) => new Date(b.created) - new Date(a.created));
      }
      return characters;
    };

    const filterCharacters = (characters, filteringOption) => {
      if (filteringOption) {
        return characters.filter(character => character.status.toLowerCase() === filteringOption.toLowerCase());
      }
      return characters;
    };

    // Applying filtering first, then sorting
    const filteredAndSorted = sortCharacters(filterCharacters(characterList, filteringOption), sortingOption);
    setFilteredCharacters(filteredAndSorted);
  }, [characterList, sortingOption, filteringOption]);  

  // Resetting page to 1 when sorting option changes
  useEffect(() => {
    setPage(1); 
  }, [sortingOption]);

  // Resetting page to 1 when filtering option changes
  useEffect(() => {
    setPage(1); 
  }, [filteringOption]);

  // Adjusting page numbers if out of range for the new filter
  useEffect(() => {
    if (page > maxPages) {
      setPage(maxPages); // Setting page to maxPages if the current page exceeds the new maxPages
    }
  }, [maxPages, page]); 

  // Disableing the "Previous" button if on the first page
  const isFirstPage = page === 1;

  // Disableing the "Next" button if on the last page of filtered data
  const isLastPage = page === maxPages;

  // Handling when going to the previous page
  const goToPreviousPage = () => {
    if (!isFirstPage) {
      setPage(prevPage => prevPage - 1);
    }
  };

  // Handling when going to the next page
  const goToNextPage = () => {
    if (!isLastPage) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Handling loading state
  if (loading) return <p>Loading...</p>;

  // Handling error state
  if (error) return <p>{error}</p>;

  // Handling empty results
  if (filteredCharacters.length === 0) return <ErrorMessage message="No characters found" />;

  return (
    <div>
      <SortingAndFiltering
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
        filteringOption={filteringOption}
        setFilteringOption={setFilteringOption}
      />
      <div className="character-grid">
        {filteredCharacters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>


      <PaginationControls
        page={page}
        maxPages={maxPages}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </div>
  );
}

export default CharacterPage;
