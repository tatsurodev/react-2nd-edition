import React, { useEffect, useReducer } from 'react'
import notesReducer from '../reducers/notes'
import NoteList from './NoteList'
import AddNoteForm from './AddNoteForm'
import NotesContext from '../context/notes-context'

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, [])



  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'))
    if (notes) {
      dispatch({
        type: 'POPULATE_NOTES',
        notes,
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    // shareしたい値をvalue属性のobject形式で複数指定
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Notes</h1>
      <NoteList />
      <AddNoteForm />
    </NotesContext.Provider>
  )
}

export { NoteApp as default }
