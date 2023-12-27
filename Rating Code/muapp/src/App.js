import React from 'react';

const ColorRating = ({ rating }) => {
  const getColor = () => {
    if (rating >= 4.5) {
      return 'green';
    } else if (rating >= 3) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  const starStyle = {
    color: getColor(),
    fontSize: '24px',
  };

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} style={starStyle}>
          ★
        </span>
      ))}
      <span style={{ marginLeft: '8px' }}>{rating}</span>
    </div>
  );
};

// Example usage
const App = () => {
  return (
    <div>
      <h1>Product Ratings</h1>
      <ColorRating rating={4.8} />
      <ColorRating rating={3.2} />
      <ColorRating rating={2.5} />
    </div>
  );
};

export default App;
