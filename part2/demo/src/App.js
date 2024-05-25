import { useState, useEffect } from "react"
import noteService from './services/notes'
import Note from "./components/Note"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // Effect 允许组件连接到外部系统并与之同步。
  // 这包括处理网络、浏览器、DOM、动画、使用不同 UI 库编写的小部件以及其他非 React 代码。
  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  // 函数useEffect实际上需要两个参数。第一个是一个函数，即effect本身。
  // 默认情况下，effect会在每次完成渲染后运行，但你可以选择只在某些值发生变化时启动它。
  // 所以默认情况下，effect总是在组件被渲染后运行。然而，在我们的例子中，我们只想在第一次渲染时执行效果。
  // useEffect的第二个参数用于指定效果的运行频率。如果第二个参数是一个空的数组[]，那么效果就只在组件的第一次渲染时运行。
  useEffect(hook, [])
  // 总的来说，useEffect提供了一种在【函数组件】中组织和处理副作用的方式。
  // useEffect的工作方式如下：
  // 在每次渲染后，包括首次渲染，useEffect 都会运行。这就是为什么我们说它在“副作用”之后运行。这与类组件的 componentDidMount 和 componentDidUpdate 生命周期方法类似。
  // 你可以在 useEffect 中返回一个函数，这个函数将在组件卸载前运行，以及在后续渲染前运行。这就是为什么我们说它在“清理副作用”之前运行。这与类组件的 componentWillUnmount 生命周期方法类似。
  // 你可以给 useEffect 传递第二个参数，这个参数是一个数组，里面包含了你的副作用函数依赖的所有值。当这些值发生改变时，useEffect 就会重新运行。如果这个数组为空，useEffect 只会在首次渲染和卸载时运行。
  console.log('render', notes.length, 'notes')
  // 注意：事件序列。代码的哪些部分被运行？以什么顺序？多久一次？了解事件的顺序是至关重要的!

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    // { ...note }创建了一个新的对象，并复制了note对象的所有属性
    // 还值得注意的是，新对象changedNote只是一个浅层拷贝，意味着新对象的值与旧对象的值相同。
    // 如果旧对象的值本身是对象，那么新对象中的复制值将引用旧对象中的相同对象。
    const changedNote = { ...note, important: !note.important }
    // 不推荐这样做，因为变量note是对组件状态中notes数组中的一个项目的引用，
    // 记得决不能在React中直接改变状态
    // note.important = !note.important

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // 参数event是触发调用事件处理函数的事件
  const addNote = (event) => {
    // 防止提交表单的默认动作。默认动作会忽略其他操作，导致页面重新加载。
    event.preventDefault()
    // event.target是组件中定义的表单
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // 省略了id属性，因为最好让服务器为我们的资源生成id
      id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        // console.log(response)
        // 该方法并不改变原始的notes数组，而是创建一个新的数组副本，将新的项目添加到最后。这很重要，因为在React中必须永远不要直接改变状态!
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    // 注意，我们不需要像在onSubmit事件处理程序中那样调用event.preventDefault()方法。因为在输入变化时没有默认动作，这与表单提交时不同。
    // 该元素的输入值
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // 在JavaScript中，val1 == val2并不是在所有情况下都能如愿以偿，在比较中完全使用val1 === val2会更安全。
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)// === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          // React使用数组中对象的键属性来决定如何在组件重新渲染时更新该组件生成的视图。
          // <li key={note.id}>
          //   {note.content}
          // </li>
          // 注意，现在必须为Note组件定义key属性，而不是像以前那样为li标签定义。
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      {/* Anti-pattern: Array Indexes as Keys
      向map方法的回调函数传递第二个参数，可以拿到索引。
      当这样调用时，i被分配为笔记所在的数组中的索引值。 */}
      {/* <ul>
        {notes.map((note, i) =>
          <li key={i}>
            {note.content}
          </li>
        )}
      </ul> */}
      <form onSubmit={addNote}>
        <input
          // 受控组件：由于我们将App组件的一部分状态newNote指定为input的value属性，App组件现在控制了input元素的行为。
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )

}

export default App