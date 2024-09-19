// src/App.js

import React, { useState } from 'react';
import CharacterPage from './Pages/CharacterPage';
import './styles.css'; 

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);  // Store theme preference
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <header>
        <h1>Rick and Morty Character Feed</h1>
        <button onClick={toggleDarkMode}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <CharacterPage />
    </div>
  );
}

export default App;
