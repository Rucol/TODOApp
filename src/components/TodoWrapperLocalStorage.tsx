import React, { useState, useEffect } from 'react';
import  TodoForm from './TodoForm.tsx';
import { v4 as uuidv4 } from 'uuid';
import  Todo  from './Todo.tsx';
import  EditTodoForm  from './EditTodoForm.tsx';

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

export const TodoWrapperLocalStorage: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const savedTodos: TodoItem[] = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  const addTodo = (todo: string) => {
    const newTodos: TodoItem[] = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const toggleComplete = (id: string) => {
    const newTodos: TodoItem[] = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const deleteTodo = (id: string) => {
    const newTodos: TodoItem[] = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const editTodo = (id: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const editTask = (task: string, id: string) => {
    const newTodos: TodoItem[] = todos.map(todo =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm key={index} editTodo={(task, id) => editTask(task, id)} task={todo} />
        ) : (
          <Todo key={index} task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} plugWeekly={function (task: string): void {
                      throw new Error('Function not implemented.');
                  } } />
        )
      )}
    </div>
  );
};
