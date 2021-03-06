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

  const minimizedView = () => <p>{blog.title} {blog.author} <button className="viewButton" onClick={changeVisibility}>view</button></p>

  const expandedView = () => {

    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

    return(
      <div key={blog.id}>
        <p>{blog.title} {blog.author} <button className="hideButton" onClick={changeVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.votes} <button className="likeButton" onClick={upvote}>like</button></p>
        <p>{blog.user.name}</p>
        {user.name !== blog.user.name ? null: <button className='deleteButton' onClick={remove}>remove</button>}
      </div>
    )
  }

  return (
    <div className="blog" key={blog.id} style={blogStyle}>
      {viewDetails ? expandedView() : minimizedView()}
    </div>
  )
}

export default Blog
