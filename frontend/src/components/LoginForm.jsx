const LoginForm = ({userLogin, username, handleUsernameChange, password, handlePasswordChange}) => {
    return (
        <div>
            <form onSubmit={userLogin}>
                <h2>Login</h2>
                <div>
                    username
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange} 
                    />
                </div>
                <div>
                    password
                    <input
                      type="text"
                      value={password}
                      onChange={handlePasswordChange} 
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm