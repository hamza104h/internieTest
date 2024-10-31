import React from 'react';
import './buttons.css'; // Import the CSS styles

const Button = ({ postsToShow, setPostsToShow }) => {
  return (
    <div className="button-group">
      {[1, 2, 3, 4, 5].map(num => (
        <button 
          key={num} 
          onClick={() => setPostsToShow(num)} 
          className={`post-button ${postsToShow === num ? 'active' : ''}`}
        >
          {num} Post{num > 1 ? 's' : ''}
        </button>
      ))}
    </div>
  );
};

export default Button;