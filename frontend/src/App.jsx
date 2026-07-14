import { useState, useEffect, useRef } from "react"
import noteService from './services/notes'
import loginService from './services/login'

import {
  BrowserRouter as Router,
  Routes, Route, Navigate, Link
} from 'react-router-dom'

import Note from "./components/Note"
import LoginForm from "./components/LoginForm"
import NoteForm from "./components/NoteForm"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"

import Home from "./pages/Home"

const App = () => {
  
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [messageError, setMessageError] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)

  const noteFormRef = useRef()


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

  const userLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setMessageSuccess(`${user.name} successfully logged in`)
      setTimeout(() => {
        setMessageSuccess(null)
      }, 5000)

    } catch {
      console.log('invalid credentials')
      setMessageError('invalid username & password')
      setTimeout(() => {
        setMessageError(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
    
    setMessageSuccess('successfully created new note')
    setTimeout(() => {
      setMessageSuccess(null)
    }, 5000)
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

    setMessageSuccess('successfully deleted note')
    setTimeout(() => {
      setMessageSuccess(null)
    }, 5000)
    
  }

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <h1>Welcome to Notes app</h1>
      <Notification message={messageError} style="error"/>
      <Notification message={messageSuccess} style="success" />
      <div>
        <Link style={padding} to="/">home</Link>
        {!user && (
          <Link style={padding} to="/login">login</Link>
        )}
        {user && (
          <div>
            <Link style={padding} to="create">new note</Link>
            <button onClick={handleLogout}>logout</button>
          </div>
          
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={
          user === null ? 
            <LoginForm userLogin={userLogin}/>
          :
            <Navigate to="/" replace/>
        } />
        <Route path="create" element={
          user === null ?
            <Navigate to="/" replace/>
          :
           <NoteForm createNote={addNote}/> 
        } />
      </Routes>

      <ul>
        {notes.map(
          note => <Note key={note.id} content={note.content} deleteNote={() => handleDelete(note.id)}/>
        )}
      </ul>
    </Router>
  )
}

export default App
