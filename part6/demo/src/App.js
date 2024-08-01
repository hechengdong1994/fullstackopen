import React, { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter'
import { useDispatch } from 'react-redux';
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()
  // 使用useEffect钩子会导致一个eslint警告。


  useEffect(() => {
    // noteService
    //   .getAll().then(notes => dispatch(setNotes(notes)))
    dispatch(initializeNotes())
    // 通过下面的操作摆脱它
    // 另一个方法是在这一行禁用eslint。
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App;
