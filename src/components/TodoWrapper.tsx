import React, { useState, useEffect } from "react";
import Todo from "./Todo.tsx";
import TodoForm from "./TodoForm.tsx";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm.tsx";
import { CButton } from "@coreui/react";
import { Button } from "react-bootstrap";

interface TodoItem {
  id: string;
  task: string;
  deadline?: number;
  completed: boolean;
  isEditing?: boolean;
}

const TodoWrapper: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [weeklyTodos, setWeeklyTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const dailyInterval = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (!todo.completed && todo.deadline) {
            const updatedDeadline = todo.deadline - 1000;
            if (updatedDeadline <= 0) {
              return { ...todo, completed: true };
            } else {
              return { ...todo, deadline: updatedDeadline };
            }
          } else {
            return todo;
          }
        })
      );
    }, 1000);

    return () => {
      clearInterval(dailyInterval);
    };
  }, []);

  const addTodo = (todo: string) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        deadline: Date.now() + 86400000,
      },
    ]);
  };

  const addWeeklyTodo = (todo: string) => {
    setWeeklyTodos([
      ...weeklyTodos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        deadline: Date.now() + 7 * 86400000,
      },
    ]);
  };

  const deleteTodo = (id: string) => setTodos(todos.filter((todo) => todo.id !== id));

  const deleteWeeklyTodo = (id: string) =>
    setWeeklyTodos(weeklyTodos.filter((todo) => todo.id !== id));

  const toggleComplete = (id: string, listType: string) => {
    if (listType === "daily") {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? todo.deadline && todo.deadline < Date.now()
              ? { ...todo, completed: false, deadline: Date.now() + 60000 }
              : { ...todo, completed: !todo.completed }
            : todo
        )
      );
    } else if (listType === "weekly") {
      setWeeklyTodos((prevWeeklyTodos) =>
        prevWeeklyTodos.map((todo) =>
          todo.id === id
            ? todo.deadline && todo.deadline < Date.now()
              ? { ...todo, completed: false, deadline: Date.now() + 7 * 86400000 }
              : { ...todo, completed: !todo.completed }
            : todo
        )
      );
    }
  };

  const editTodo = (id: string, listType: string) => {
    if (listType === "daily") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    } else if (listType === "weekly") {
      setWeeklyTodos(
        weeklyTodos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    }
  };

  const editTask = (task: string, id: string, listType: string) => {
    if (listType === "daily") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
    } else if (listType === "weekly") {
      setWeeklyTodos(
        weeklyTodos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
    }
  };

  const plugWeekly = (task: string) => {
    setWeeklyTodos([
      ...weeklyTodos,
      { id: uuidv4(), task, completed: false},
    ]);
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <h3>Click plug to plug task as a weekly!</h3>
      <TodoForm addTodo={addTodo} />
      <h3>Daily Todos:</h3>
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            key={todo.id}
            editTodo={(task, id) => editTask(task, id, "daily")}
            task={todo}
          />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={(id) => editTodo(id, "daily")}
            toggleComplete={(id) => toggleComplete(id, "daily")}
            plugWeekly={plugWeekly}
          />
        )
      )}
      <h3>Weekly Todos:</h3>
      {weeklyTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            key={todo.id}
            editTodo={(task, id) => editTask(task, id, "weekly")}
            task={todo}
          />
        ) : (
          <Todo
              key={todo.id}
              task={todo}
              deleteTodo={deleteWeeklyTodo}
              editTodo={(id) => editTodo(id, "weekly")}
              toggleComplete={(id) => toggleComplete(id, "weekly")} plugWeekly={function (task: string): void {
                throw new Error("Function not implemented.");
              } }          />
        )
      )}
      {/* Użyj przycisku React Bootstrap do dodawania dziennego zadania */}
      <Button variant="primary" onClick={() => addTodo("Daily Task")}>
        Add Daily Todo
      </Button>
      {/* Użyj przycisku Core UI do dodawania tygodniowego zadania */}
      <CButton color="primary" onClick={() => addWeeklyTodo("Weekly Task")}>
        Add Weekly Todo
      </CButton>
    </div>
  );
};

export default TodoWrapper;
