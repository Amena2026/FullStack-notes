import { useState } from "react"

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
                <label>
                    username
                    <input
                      type="text"
                      value={username}
                      onChange={event => setUsername(event.target.value)} 
                    />
                </label>
                <label>
                    password
                    <input
                      type="text"
                      value={password}
                      onChange={event => setPassword(event.target.value)} 
                    />
                </label>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm