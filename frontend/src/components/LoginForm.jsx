import { useState } from "react"
import { TextField, Button } from "@mui/material"

const LoginForm = ({userLogin}) => {
    // we are moving the state responsible for changing the form (ie username & password) from app to LoginForm
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) => {
        // login stuff here
        event.preventDefault()
        
        userLogin({username, password})
        
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={login}>
                <h2>Login</h2>
                <TextField
                  label="username"
                  value={username}
                  onChange={event => setUsername(event.target.value)} 
                />
                <TextField
                  label="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
                <Button type="submit" variant="contained" style={{ marginTop: 10 }}>save</Button>
            </form>
        </div>
    )
}

export default LoginForm