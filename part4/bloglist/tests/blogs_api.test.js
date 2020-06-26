const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const { blogsInDB } = require('./test_helper');

describe('connection to database', () => {
  test('is established in 50 sec', async () => {
    api.get('api/blogs')
    .expect(200)
  }, 50000)
})

describe('logging in', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('root', 10)
    const user = new User({userName: 'root', passwordHash})
    await user.save()
  },50000);

  test('works with correct credentials', async () => {
    const loginCredentials = {userName: "root", password: "root"}

    await api.post('/api/login')
      .send(loginCredentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });
  test('is refused if credentials are not correct', async () => {
    const wrongPassword = {userName: "root", password: "wrongPassword"}
    const wrongPasswordResponse = await api.post('/api/login')
      .send(wrongPassword)
      .expect(401)
      expect(wrongPasswordResponse.body.error).toContain('invalid username or password')
    
    const wrongUsername = {userName: "invalidUsername", password: "root"}

    const wrongUsernameResponse = await api.post('/api/login')
      .send(wrongUsername)
      .expect(401)
        
    expect(wrongPasswordResponse.body.error).toContain('invalid username or password')
  })
});

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  
    const blogObjects = helper.initialBlogs
      .map((blog) => new Blog(blog))
  
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  });

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
    });

    test('fails with statuscode 404 if blog does not exist', async () =>{

      const validNonExistingId = await helper.nonExistingId();
      console.log('validNonExistingId: ', validNonExistingId);

      await api
        .get(`/api/blogs/${validNonExistingId}`)
        .expect(404)
    });

    test('fails with statuscode 400, if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    });
  });

  describe('addition of new blog', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('root', 10)
      const user = new User({userName: 'root', passwordHash})
      await user.save()
    });

    test('succeeds with valid data', async () => {

      const loginResponse = await api.post('/api/login').send({userName: "root", password: "root"})
      const token = `bearer ${loginResponse.body.token}`

      const newBlog = {
        author: "added author",
        title: "added title",
        url: "added url",
        votes: 0,
      }
      
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({Authorization: token})
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain('added title')
    });

    test('fails with status code 400, if data is invalid', async () => {


      const loginResponse = await api.post('/api/login').send({userName: "root", password: "root"})
      const token = `bearer ${loginResponse.body.token}`

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
      .set({Authorization: token})
      .expect(400)
    
      await api
      .post('/api/blogs')
      .send(missingURL)
      .set({Authorization: token})
      .expect(400)
    
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    });

    test('if votes are missing in post request the value defeaults to "0"', async () => {

      const loginResponse = await api.post('/api/login').send({userName: "root", password: "root"})
      const token = `bearer ${loginResponse.body.token}`

      const newBlog = {
        author: "added author",
        title: "added title",
        url: "added url",
      }
      const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({Authorization: token})
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      expect(response.body.votes).toBe(0)
    });
  });

  describe('deletion of blog', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('root', 10)
      const user = new User({userName: 'root', passwordHash})
      await user.save()


      await Blog.deleteMany({})
      const loginResponse = await api.post('/api/login').send({userName: "root", password: "root"})
      const token = `bearer ${loginResponse.body.token}`

      const newBlog = {
        author: "added author",
        title: "added title",
        url: "added url",
        votes: 0,
      }
      
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({Authorization: token})
    });

    test('succeeds with status code 204, if user credentials are submitted in header', async () => {

      const blogsAtStart = await blogsInDB();

      const loginResponse = await api.post('/api/login').send({userName: "root", password: "root"})
      const token = `bearer ${loginResponse.body.token}`

      const blogToBeDeleted = blogsAtStart[0]
    
      await api
        .delete(`/api/blogs/${blogToBeDeleted.id}`)
        .set({Authorization: token})
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    
      expect(blogsAtEnd).not.toContain(blogToBeDeleted)
    });

    test('fails if incorrect blog-id is used', async () => {
      const loginResponse = await api.post('/api/login').send({userName: "root", password: "root"})
      const token = `bearer ${loginResponse.body.token}`

      const blogsAtStart = await helper.blogsInDB()
    
      await api
        .delete(`/api/blogs/123456`)
        .set({Authorization: token})
        .expect(400)
    
      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    });

    test('fails if incorrect credentials are submitted', async () => {
      const blogsAtStart = await helper.blogsInDB()

      const blogToBeDeleted = blogsAtStart[0]

      const invalidToken = "bearer 123456"
    
      await api
        .delete(`/api/blogs/${blogToBeDeleted.id}`)
        .set({Authorization: invalidToken})
        .expect(401)
    
      const blogsAtEnd = await helper.blogsInDB()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
  });

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('root', 10)
      const user = new User({userName: 'root', passwordHash})
      await user.save()
    });

    test('creation of new user succeds with a fresh username', async () => {
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
    });

    test('creation of new user fails with proper status code message if username is already taken', async () => {
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
    });

    test('creation of new user fails with proper status code message if username is too short', async () => {
      const usersAtStart = await helper.usersInDB()
    
      const shortUserName = {
        userName: 'as',
        name: 'Superuser',
        password: 'definetlynotroot'
      }

      const response = await api
        .post('/api/users')
        .send(shortUserName)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      expect(response.body.error).toContain('userName must be at least three characters long')
     
      const usersAtEnd = await helper.usersInDB()

      expect(usersAtEnd.length).toBe(usersAtStart.length)
    });

    test('creation of new user fails with proper status code message if password is too short', async () => {
      const usersAtStart = await helper.usersInDB()

      const shortPassword = {
        userName: 'asdasd',
        name: 'Superuser',
        password: 'as'
      }
    
      const response = await api
        .post('/api/users')
        .send(shortPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      expect(response.body.error).toContain('password must be at least three characters long')

      const usersAtEnd = await helper.usersInDB()

      expect(usersAtEnd.length).toBe(usersAtStart.length)
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});