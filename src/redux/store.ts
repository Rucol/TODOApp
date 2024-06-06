
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers.ts';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: rootReducer
}
);

export default store;
