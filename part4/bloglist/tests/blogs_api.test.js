const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const User = require('../models/userModel');
const Blog = require('../models/blogModel')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  
    const blogObjects = helper.initialBlogs
      .map((blog) => new Blog(blog))
  
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  }, 50000)

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('blogs are returned with correct fields', async () => {
    const blogs = await helper.blogsInDB()
    expect(blogs[0].id).toBeDefined()
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map((blog) => blog.title)
    expect(titles).toContain('test title 1')
  });

  describe('viewing specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToView = blogsAtStart[0]
    
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      expect(resultBlog.body.id).toEqual(blogToView.id.toString())
    })

    test('fails with statuscode 404 if blog does not exist', async () =>{

      const validNonExistingId = await helper.nonExistingId();
      console.log('validNonExistingId: ', validNonExistingId);

      await api
        .get(`/api/blogs/${validNonExistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400, if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of new blog', () => {
    test('succeeds with valid data', async () => {
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

    test('fails with status code 400, if data is invalid', async () => {
      const missingTitle = {
        author: "missingTitleAuthor",
        url: "missingTitleurl",
        votes: 0,
      }
    
      const missingURL = {
        author: "missingURLAuthor",
        title: "missingURLTitle",
        votes: 0,
      }
    
      await api
      .post('/api/blogs')
      .send(missingTitle)
      .expect(400)
    
      await api
      .post('/api/blogs')
      .send(missingURL)
      .expect(400)
    
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('if votes are missing in post request the value defeaults to "0"', async () => {
      const newBlog = {
        author: "added author",
        title: "added title",
        url: "added url",
      }
      const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      expect(response.body.votes).toBe(0)
    })

  })

  describe('deletion of blog', () => {
    test('succeeds with status code 204, if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToBeDeleted = blogsAtStart[0]
    
      await api
        .delete(`/api/blogs/${blogToBeDeleted.id}`)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    
      expect(blogsAtEnd).not.toContain(blogToBeDeleted)
    })
  })

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({userName: 'root', passwordHash})
      await user.save()
    })

    test('creation succeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDB()
  
      const newUser = {
        userName: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDB()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map((user) => user.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper status code message if username is already taken', async () => {
      const usersAtStart = await helper.usersInDB()
    
      const newUser = {
        userName: 'root',
        name: 'Superuser',
        password: 'definetlynotroot'
      }
    
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`userName` to be unique')
    
        const usersAtEnd = await helper.usersInDB()

        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })
  })

  afterAll(() => {
    mongoose.connection.close();
  });

});