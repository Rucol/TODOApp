// todoReducer.ts
import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from './actions.ts';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[] | undefined;
}

const initialState: TodoState = {
  todos: undefined, // Tutaj możesz zdefiniować początkowy stan jako undefined
};

const todoReducer = (state: TodoState = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos ? [...state.todos, action.payload] : [action.payload],
      };
    // Obsłuż inne akcje
    default:
      return state;
  }
};

export default todoReducer;
