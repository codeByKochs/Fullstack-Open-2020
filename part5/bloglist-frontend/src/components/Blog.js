import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, updateBlog, deleteBlog }) => {

  const [viewDetails, setViewDetails] = useState(false)

  const changeVisibility = () => {
    setViewDetails(!viewDetails)
  }

  const upvote = () => {
    blog.votes = blog.votes + 1
    updateBlog(blog)
  }

  const remove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog.id)
    }
  }

  const minimizedView = () => <p>{blog.title} {blog.author} <button onClick={changeVisibility}>view</button></p>

  const expandedView = () => {

    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    return(
      <div key={blog.id}>
        <p>{blog.title} {blog.author} <button className="viewButton" onClick={changeVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.votes} <button onClick={upvote}>like</button></p>
        <p>{blog.user.name}</p>
        {user === null || user.name === blog.user.name ? <button className='likeButton'  onClick={remove}>remove</button> : null}
      </div>
    )
  }

  return (
    <div key={blog.id} style={blogStyle} className="Blog">
      {viewDetails ? expandedView() : minimizedView()}
    </div>
  )
}

export default Blog
