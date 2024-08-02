import { useQuery, useMutation, useQueryClient } from 'react-query'
import noteService from './services/notes'

const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation(noteService.createNote, {
    onSuccess: (newNote) => {
      // queryClient.invalidateQueries('notes')
      // 必要情况下，也可以通过 手动更新 React Query 所维护的查询状态，以实现性能优化。
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueryData('notes', notes.concat(newNote))
    }
  })

  const updateNoteMutation = useMutation(noteService.updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const toggleImportance = (note) => {
    console.log('toggle importance of', note.id)
  }

  const result = useQuery(
    'notes',
    // 第一个参数（字符串 "notes" ）是已定义查询的 key，即笔记列表
    // useQuery 函数的返回值是一个包含查询状态的对象。
    // 服务器中的数据现在完全在 React Query 库的管理下，应用程序完全不需要用 React 的 useState 钩子定义状态！
    // () => axios.get('http://localhost:3001/notes').then(res => res.data)
    () => noteService.getNotes(),
    {
      // React Query 查询的默认功能是：当窗口焦点，即应用中用户界面的活动元素，发生变化时，查询（其状态为 stale）会被更新。
      // React Query 引发的应用重复渲染是多么频繁。经验法则是，应在有需要的时候（即在查询状态发生变化时），才进行重新渲染。
      refetchOnWindowFocus: false
    }
  )
  console.log(result)

  if (result.isLoading) {
    reutrn(<div>loading data...</div>)
  }

  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App