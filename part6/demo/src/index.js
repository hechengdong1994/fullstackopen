import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

// 组合式还原器的工作方式是每个动作都在组合式还原器的每个部分得到处理。
// 通常情况下，只有一个还原器对任何给定的动作感兴趣
// 但也有这样的情况：多个还原器基于同一个动作改变各自的状态部分。
// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })
// const store = createStore(noteReducer)
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider >
);
