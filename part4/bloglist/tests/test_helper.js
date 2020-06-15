const Blog = require('../models/blogModel')

const initialBlogs = [
    {
      author: "test author 1",
      title: "test title 1",
      url: "test url 1",
      votes: 0
    },
    {
      author: "test author 2",
      title: "test title 2",
      url: "test url 2",
      votes: 0
    }
  ]

  const nonExistingId = async () => {
      const blog = new Blog({
        author: "toBeRemoved",
        title: "toBeRemoved",
        url: "toBeRemoved",
        votes: 0
      })

      await blog.save()
      await blog.remove()

      return blog._id.toString()
  }

  const blogsInDB = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
  }

  module.exports = {
      initialBlogs, nonExistingId, blogsInDB,
  }