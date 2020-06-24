import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Blogdisplay from './components/BlogDisplay'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')

  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({userName, password})

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUserName('')
      setPassword('')
      
      console.log(`logged in as ${user.name}`);
      
      
    } catch (exception) {
      /* TODO: create message display
       setErrorMessage('Wrong credentials')
       setTimeout(() => {
       setErrorMessage(null)
       }, 5000)
      */
     console.log('Wrong credentials');
    }
  }

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null)
    window.localStorage.clear()
    console.log('logged out');
  }

  const handleBlogChange = (target) => {
    setNewBlog(target.value)
  }

  const handleBlogCreation = (event) => {
    event.preventDefault()
    blogService.create(newBlog)
    setNewBlog('')
  }

  return (
    <div>
      <h2>blogs</h2>
      <LoginForm user={user} handleLogout={handleLogout} userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
      <BlogForm user={user} setNewBlog={setNewBlog} handleBlogChange={handleBlogChange} handleBlogCreation={handleBlogCreation} />
      <Blogdisplay user={user} blogs={blogs}/>
    </div>
  )
}

export default App