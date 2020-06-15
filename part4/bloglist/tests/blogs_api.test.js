const mongoose = require('mongoose');
var supertest = require('supertest');
var jest = require('jest');
const helper = require('./test_helper');
var app = require('../app');
const api = supertest(app);

const Blog = require('../models/blogModel')

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
}, 50000)

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
});

test('first blog in DB is expected blog entry', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].author).toBe(helper.initialBlogs[0].author)
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    author: "added author",
    title: "added title",
    url: "added url",
    votes: 0,
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('added title')
})

test('a non-valid blog is not added', async () => {
  const newBlog = {}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView._id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body._id).toEqual(blogToView._id.toString())
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToBeDeleted = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToBeDeleted._id}`)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  expect(blogsAtEnd).not.toContain(blogToBeDeleted)
})


afterAll(() => {
  mongoose.connection.close();
});