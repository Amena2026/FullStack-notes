const LoginForm = ({userLogin, username, handleUsernameChange, password, handlePasswordChange}) => {
    return (
        <form onSubmit={userLogin}>
            <p>enter username: </p>
                <input 
                  type="text"
                  value={username}
                  onChange={handleUsernameChange} 
                />
            <p>enter password: </p>
                <input 
                  type="text"
                  value={password}
                  onChange={handlePasswordChange} 
                />
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm