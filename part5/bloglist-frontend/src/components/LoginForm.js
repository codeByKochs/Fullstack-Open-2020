import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ userName, setUserName, password, setPassword, handleLogin }) => {

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
            onChange = {({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
                    password
          <input
            type = "password"
            value = {password}
            name = "Password"
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  pasword: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm