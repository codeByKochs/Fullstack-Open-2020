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
    console.log(blog);
    
    updateBlog(blog)
  }

  const remove = () => {
    deleteBlog(blog.id)
  }

  const minimizedView = () => <p>{blog.title} {blog.author} <button onClick={changeVisibility}>view</button></p>
  
  const expandedView = () => {
    return(
      <div>
        <p>{blog.title} {blog.author} <button onClick={changeVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.votes} <button onClick={upvote}>like</button></p>
        <p>{blog.user.name}</p>
        <button onClick={remove}>remove</button>
      </div>
    )
  }

  return (
    <div key={blog.id} style={blogStyle}>
      {viewDetails ? expandedView() : minimizedView()}
    </div>
  )
}

export default Blog
