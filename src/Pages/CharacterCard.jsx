import React from 'react';
import '../Styles/CharacterCard.css'; // Import the CSS file

const CharacterCard = ({ character }) => {
    return (
        
      <div className="character-card">
        <div className="image-container">
          <img src={character.image} alt={character.name} className="character-image" />
        </div>
        <div className="character-info">
          <h2 className="character-name">{character.name}</h2>
          <div className="character-details">
            <div className="detail-item species">
              <span className="label">Species:</span>
              <span className="value">{character.species || 'N/A'}</span>
            </div>
            <div className="detail-item status">
              <span className="label">Status:</span>
              <span className="value">{character.status || 'N/A'}</span>
            </div>
            <div className="detail-item gender">
              <span className="label">Gender:</span>
              <span className="value">{character.gender || 'N/A'}</span>
            </div>
            <div className="detail-item created">
              <span className="label">Date Created:</span>
              <span className="value">{new Date(character.created).toLocaleDateString() || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CharacterCard;