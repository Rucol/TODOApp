// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import Home from './components/Home.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import TodoWrapper from './components/TodoWrapper.tsx';
import { TodoWrapperLocalStorage } from './components/TodoWrapperLocalStorage.tsx';
import Clock from './components/Clock.tsx';
import EditTodoForm from './components/EditTodoForm.tsx';
import Todo from './components/Todo.tsx';
import TodoForm from './components/TodoForm.tsx';

ReactDOM.render(
  <Provider store={store}> {/* Obejmij Router w Provider i przekaż mu magazyn */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/todo" element={<TodoWrapper />} />
        <Route path="/todolocal" element={<TodoWrapperLocalStorage />} />
        <Route path="/clock" element={<Clock />} />
        <Route
          path="/edittodo"
          element={
            <EditTodoForm
              editTodo={function (value: string, id: string): void {
                throw new Error('Function not implemented.');
              }}
              task={{
                id: '',
                task: '',
              }}
            />
          }
        />
        <Route
          path="/todoitem"
          element={
            <Todo
              task={{
                id: '',
                task: '',
                deadline: undefined,
                completed: false,
              }}
              deleteTodo={function (id: string): void {
                throw new Error('Function not implemented.');
              }}
              editTodo={function (id: string): void {
                throw new Error('Function not implemented.');
              }}
              toggleComplete={function (id: string): void {
                throw new Error('Function not implemented.');
              }}
              plugWeekly={function (task: string): void {
                throw new Error('Function not implemented.');
              }}
            />
          }
        />
        <Route
          path="/todoform"
          element={
            <TodoForm
              addTodo={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            />
          }
        />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);
