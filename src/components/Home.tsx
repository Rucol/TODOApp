import React from 'react';
import { Link } from 'react-router-dom';
import Clock from './Clock.tsx'
import TodoWrapper from './TodoWrapper.tsx'
import '../App.css'

const Home: React.FC = () => {
  return (
    
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the Home Page!</p>
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/contact">
        <button>Contact</button>
      </Link>
    

      <Clock />
      <TodoWrapper />

    </div>
  );
};

export default Home;
