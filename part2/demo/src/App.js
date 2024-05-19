import Note from "./components/Note"

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
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
    </div>
  )
}

export default App