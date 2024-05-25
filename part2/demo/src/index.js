import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'


// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     date: '2019-05-30T17:30:31.098Z',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     date: '2019-05-30T18:39:34.091Z',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: '2019-05-30T19:20:14.298Z',
//     important: true
//   }
// ]

// // map总是创建一个新的数组，其中的元素是通过mapping从原始数组的元素中创建的：原始值作为mapping方法函数的参数。
// const result = notes.map(note => note.id)
// console.log(result)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <App notes={notes} />
// )

// import axios from 'axios'
// Promise是一个代表异步操作最终完成或失败的对象。
// 一个 promise 可以有三种不同的状态PromiseStatus。
// 1.pending：这意味着最终值（以下两个中的一个）还不能用。
// 2.fulfilled：它意味着操作已经完成，最终值可用，一般来说是一个成功的操作。这种状态有时也被称为resolved。
// 3.rejected：这意味着一个错误阻止了最终值的确定，这一般代表一个失败的操作。
// JavaScript运行环境调用由then方法注册的回调函数，为其提供一个response对象作为参数。
// response对象包含与HTTP GET请求的响应相关的所有基本数据，其中包括返回的数据、状态代码和头信息。
// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)
// promise.then(response => {
//   console.log(response)
// })
// 链式方法调用
// axios
//   .get('https://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data
//     console.log(notes)
//   })

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)


// 调用并渲染
// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data
//     ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
//   })


ReactDOM.createRoot(document.getElementById('root')).render(<App />)