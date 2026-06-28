import { useState, useEffect } from "react"
import Note from "./components/Note"
import Form from "./components/Form"
import LoginForm from "./components/LoginForm"
import noteService from './services/notes'
import loginService from './services/login'
import NoteForm from "./components/NoteForm"
import Togglable from "./components/Togglable"

const App = () => {
  
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  const [username, setUsername] = useState(' ')
  const [password, setPassword] = useState(' ')
  const [user, setUser] = useState(null)


  // to load the screen with existing notes data, were going to make a Http get request with the axious library 
  // to the localhost:3001/notes url, then update the state of notes with the data of the response returned 
  // from that url 

  useEffect(() => {
    noteService
     .getAll()
     .then(response => {
       setNotes(response.data)
     })
  },[])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, []) 

  const userLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('invalid credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  /*
  const addNote = event => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
     .create(noteObject)
     .then(response => {
      setNotes(notes.concat(response))
      setNewNote('')
     })

  } */

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const handleDelete = id => {
    console.log("id: ", id)
    console.log("notes before delete", notes)
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id == id)
    
    console.log("url:", url)
    console.log("note:", note)


     noteService
      .remove(id)
      .then(() => {
        setNotes(notes.filter(n => n.id !== id))
      })
    
  }

  const handleNoteChange = () => {
    setNewNote(event.target.value)
  }

  const handleUsernameChange = () => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = () => {
    setPassword(event.target.value)
  }

  const showLoginForm = () => (
    <LoginForm
      userLogin={userLogin}
      username={username}
      handleUsernameChange={handleUsernameChange}
      password={password}
      handlePasswordChange={handlePasswordChange} 
    />
  )
  /*
  const showNoteForm = () => (
    <div>
      <button onClick={handleLogout}>logout</button>
      <p>welcome {user.name}</p>
      <Form
      addNote={addNote}
      newNote={newNote}
      handleNoteChange={handleNoteChange} 
      />
    </div>
  )
  */
  
  const showNoteForm = () => (
    <Togglable buttonLabel= 'new note'>
      <NoteForm createNote={addNote}/>
    </Togglable>
  )


  return (
    <div>
      {!user && showLoginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {showNoteForm()}
        </div>
      )}
      <ul>
        {notes.map(
          note => <Note key={note.id} content={note.content} deleteNote={() => handleDelete(note.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App
