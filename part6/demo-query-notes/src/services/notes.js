let notes = [
  {
    id: 10000,
    content: 'This note is not saved to server',
    important: true
  }
]

const getNotes = async () => {
  return notes
}

const createNote = async (content) => {
  const object = { content, important: false, id: Date.now() }
  notes = [...notes, object]
  return object
}

const updateNote = async (id, newObject) => {
  const data = { ...newObject, id: id }
  notes = notes.map(note => note.id === id ? data : note)
  return data
}

export default { getNotes, createNote, updateNote }