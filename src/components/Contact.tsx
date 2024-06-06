
import React from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <div>
      <h2>Contact Page</h2>
      <p>Welcome to the Contact Page!</p>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>

    </div>
  );
};

export default Contact;
