import React from 'react'

const LoginForm = ({user, handleLogout, userName, setUserName, password, setPassword, handleLogin}) => {
    
    return (
        <div>
            <h1>Log in to application</h1>
            <form onSubmit={handleLogin}> 
                <div>
                userName
                    <input 
                    type = "text"
                    value = {userName}
                    name = "Username"
                    onChange = {({target}) => setUserName(target.value)}
                    />
                </div>
                <div>
                    password
                    <input 
                    type = "password"
                    value = {password}
                    name = "Password"
                    onChange = {({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

    

export default LoginForm