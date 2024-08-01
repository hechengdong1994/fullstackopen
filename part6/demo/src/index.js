import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import store from './store'

// 组合式还原器的工作方式是每个动作都在组合式还原器的每个部分得到处理。
// 通常情况下，只有一个还原器对任何给定的动作感兴趣
// 但也有这样的情况：多个还原器基于同一个动作改变各自的状态部分。
// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })
// const store = createStore(noteReducer)

// 为什么不用await来代替 promise 和事件处理程序（注册到then-methods）？
// await只在async函数中起作用，而index.js中的代码不在函数中，所以由于操作的简单性，我们这次就不使用async了。
// noteService.getAll().then(notes => store.dispatch(setNotes(notes)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider >
);
