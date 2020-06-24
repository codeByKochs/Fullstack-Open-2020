import React from 'react'

const LoginForm = ({user, handleLogout, userName, setUserName, password, setPassword, handleLogin}) => {
    if (user === null){
        return (
            <div>
                <h3>Log in to application</h3>
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
    } else {
        return(
            <div>
                <p>{`${user.name} logged in`}<button onClick={handleLogout}>logout</button></p> 
            </div>
        )
    }
}

    

export default LoginForm