const blogRouter = require('express').Router();
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
var jwt = require('jsonwebtoken');

// handles request of blog database
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {userName: 1, name: 1, id: 1})
    response.json(blogs.map((blog) => blog.toJSON()));
});

// handles request for specific blog identified by ID
blogRouter.get('/:id', async (request, response) => {
    blog = await Blog.findById(request.params.id).populate('user', {userName: 1, name: 1, id: 1})
    if (blog) {
        response.json(blog.toJSON());
    } else {
        response.status(404).end();
    }
});

// handles post request of new blog
blogRouter.post('/', async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        votes: request.body.votes,
        user: user._id
    });
    
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
});

// handles deletion of blog
blogRouter.delete('/:id', async (request, response) => {

// only creator of the blog is allowed to remove it
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const toBeDeleted = await Blog.findById(request.params.id)

    if (user._id.toString() === toBeDeleted.user.id.toString()){
        return response.status(401).json({error: 'token missing or invalid'})
    } else {
        response.status(204).json({error: 'invalid rights to remove blog'});
    }
});

blogRouter.put('/:id', async (request, response) => {
    const blog = {
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        votes: request.body.votes,
    };

    const updatedBlog = await Blog.findOneAndUpdate({ _id: request.params.id }, blog, { new: true, context: 'query' })
    response.json(updatedBlog.toJSON())
});

module.exports = blogRouter;
