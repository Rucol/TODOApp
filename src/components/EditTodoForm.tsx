import React, { useState } from 'react';

interface EditTodoFormProps {
  editTodo: (value: string, id: string) => void;
  task: {
    id: string;
    task: string;
  };
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ editTodo, task }) => {
  const [value, setValue] = useState<string>(task.task);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editTodo(value, task.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={handleChange} className="todo-input" placeholder="Update task" />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};

export default EditTodoForm;
