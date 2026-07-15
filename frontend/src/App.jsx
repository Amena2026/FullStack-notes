import { useState, useEffect, useRef } from "react"
import noteService from './services/notes'
import loginService from './services/login'

import { 
  Container, AppBar, Toolbar, Button, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper
 } from '@mui/material'

import {
  BrowserRouter as Router,
  Routes, Route, Navigate, Link
} from 'react-router-dom'

import LoginForm from "./components/LoginForm"
import NoteForm from "./components/NoteForm"
import Notification from "./components/Notification"

import Home from "./pages/Home"

const App = () => {
  
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
      setNotification({text: `${user.name} successfully logged in`, type: 'success'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch {
      console.log('invalid credentials')
      setNotification({text:'invalid username & password', type: 'error'})
      setTimeout(() => {
        setNotification(null)
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
        setNotification({text: `Note: ${returnedNote[0].content} added!`, type: 'success'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })  
  }

  const handleDelete = id => {
    noteService
     .remove(id)
      .then(() => {
        setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <Container>
        <Router>
          <h1>Welcome to Notes app</h1>
          <Notification notification={notification}/>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">home</Button>
              {!user && (
                <Button color="inherit" component={Link} to="/login">login</Button>
              )}
              {user && (
                <Button color="inherit" component={Link} to="/create">create</Button>
              )}
              {user && (
                <Button color="inherit" onClick={handleLogout}>logout</Button>
              )}
            </Toolbar>
          </AppBar>
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
          </ul>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Content</TableCell>
                  <TableCell>Delete Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map(note => (
                  <TableRow key={note.id}>
                    <TableCell>{note.content}</TableCell>
                    <TableCell>
                      <Button color="inherit" onClick={() => handleDelete(note.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Router>
    </Container>
  )
}

export default App
