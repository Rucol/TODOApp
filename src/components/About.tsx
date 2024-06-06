
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div>
      <h2>About Page</h2>
      <p>Welcome to the About Page!</p>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/contact">
        <button>Contact</button>
      </Link>
 
    </div>
  );
};

export default About;
