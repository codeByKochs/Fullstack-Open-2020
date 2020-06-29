import React from 'react'
import Blog from './Blog'

const Blogdisplay = ({ blogs, updateBlog, deleteBlog }) => {
  const compare = (blogA, blogB) => {
    const votesA = blogA.votes
    const votesB = blogB.votes

    let comparison = 0

    if (votesA > votesB) {
      comparison = -1
    } else if (votesA < votesB){
      comparison = 1
    }
    return comparison
  }

  blogs.sort(compare)
  return(
    <div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>)}
    </div>
  )
}

export default Blogdisplay