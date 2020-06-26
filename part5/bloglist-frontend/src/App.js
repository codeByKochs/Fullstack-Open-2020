import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Blogdisplay from './components/BlogDisplay'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayMessage = (messageType, message) => {
    setMessage(message)
    setMessageType(messageType)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ userName, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUserName('')
      setPassword('')

      console.log(`logged in as ${user.name}`)
      displayMessage('successMessage', `logged in as ${userName}`)

    } catch (exception) {
      displayMessage('errorMessage', 'wrong username or password')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
    displayMessage('successMessage', 'logged out successfully')
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      displayMessage('successMessage', 'new blog created')
    }catch (error) {
      // TODO: show more detailed message
      displayMessage('errorMessage', 'blog coud not be created')
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      await blogService.update(updatedBlog.id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    } catch (error) {
      displayMessage('errorMessage', 'blog could not be updated')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))

    } catch (error) {
      displayMessage('errorMessage', 'blog could not be deleted')
    }
  }

  const loginForm = () => {
    return(
      <Togglable buttonLabel = 'login'>
        <LoginForm
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification message={message} messageType={messageType} />
      {user === null ?
        loginForm() :
        <div>
          <p>{`${user.name} logged in`}<button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          <Blogdisplay blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
        </div>
      }
    </div>
  )
}

export default App