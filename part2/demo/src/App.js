import { useState } from "react"
import Note from "./components/Note"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

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
      id: notes.length + 1
    }

    // 该方法并不改变原始的notes数组，而是创建一个新的数组副本，将新的项目添加到最后。这很重要，因为在React中必须永远不要直接改变状态!
    setNotes(notes.concat(noteObject))
    setNewNote('')
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
          <Note key={note.id} note={note} />
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