import React , { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(
      {
        title: title,
        author: author,
        url: url
      })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
                    title
          <input
            className="title"
            type="text"
            id="title"
            onChange={({ target }) => {setTitle(target.value)}}
          />
        </div>
        <div>
                    author
          <input
            className="author"
            type="text"
            id="author"
            onChange={({ target }) => {setAuthor(target.value)}}
          />
        </div>
        <div>
                    url
          <input
            className="url"
            type="text"
            id="url"
            onChange={({ target }) => {setUrl(target.value)}}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm