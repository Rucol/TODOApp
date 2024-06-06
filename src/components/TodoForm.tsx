import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (value: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={handleChange} className="todo-input" placeholder="What is the task today?" />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
