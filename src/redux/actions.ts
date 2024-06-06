// actions.ts

// Definiuj typy akcji
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

// Twórz kreatory akcji
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    id: Math.random().toString(36).substr(2, 9), // Generuj losowy ID
    text,
    completed: false,
  },
});

export const deleteTodo = (id: string) => ({
  type: DELETE_TODO,
  payload: id,
});

export const toggleTodo = (id: string) => ({
  type: TOGGLE_TODO,
  payload: id,
});
