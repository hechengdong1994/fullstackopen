// import了三个模块，使它们可以在该文件中使用。
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

// map总是创建一个新的数组，其中的元素是通过mapping从原始数组的元素中创建的：原始值作为mapping方法函数的参数。
const result = notes.map(note=>note.id)
console.log(result)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)