import { useState } from "react"
import { TextField, Button } from "@mui/material"

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
        content: newNote,
        important: true
    })

    setNewNote('')
  }
    
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
          <TextField
            label="new note"
            value={newNote}
            onChange={event => setNewNote(event.target.value)} 
          />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>save</Button>
      </form>
    </div>
  )
}

export default NoteForm