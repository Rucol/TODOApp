import './App.css';
import TodoWrapper from './components/TodoWrapper.tsx';
import Clock from './components/Clock.tsx';
import React from 'react';

function App(): JSX.Element {
  return (
    <div className="App">
      <Clock />
      <TodoWrapper />
    </div>
  );
}

export default App;
