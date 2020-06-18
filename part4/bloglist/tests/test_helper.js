const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const initialBlogs = [
    {
      author: "test author 1",
      title: "test title 1",
      url: "test url 1",
      votes: 10
    },
    {
      author: "test author 2",
      title: "test title 2",
      url: "test url 2",
      votes: 20
    }
  ]

  const nonExistingId = async () => {
      const blog = new Blog({
        author: "toBeRemoved",
        title: "toBeRemoved",
        url: "toBeRemoved",
        votes: 4
      })

      await blog.save()
      await blog.remove()

      return blog._id.toString()
  }

  const blogsInDB = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
  }

  const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

  module.exports = {
      initialBlogs, nonExistingId, blogsInDB, usersInDB
  }