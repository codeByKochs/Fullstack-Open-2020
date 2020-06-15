const blogRouter = require('express').Router();
const Blog = require('../models/blogModel');

// greeting
blogRouter.get('/greeting', (request, response) => {
    response.send({ message: 'Hello World' });
});

// handles request of blog database
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map((blog) => blog.toJSON()));
});

// handles request for specific blog identified by ID
blogRouter.get('/:id', async (request, response, next) => {
    try {
        blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog.toJSON());
        } else {
            response.status(404).end();
        }
    } catch(exception){
        next(exception)
    };
});

// handles post request of new blog
blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog({
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        votes: request.body.votes,
    });

    try {
        const savedBlog = await blog.save();
        response.json(savedBlog.toJSON())
    } catch (exception){
        next(exception)
    }
});

// handles deletion of blog
blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findOneAndRemove(request.params.id)
        response.status(200).end();
    } catch (exception) {
        next(exception)
    }
});

blogRouter.put('/:id', async (request, response, next) => {
    const blog = {
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        votes: request.body.votes,
    };

    try {
        const updatedBlog = await Blog.findOneAndUpdate({ _id: request.params.id }, blog, { new: true, context: 'query' })
        response.json(updatedBlog.toJSON())
    } catch (exception){
        next(exception)
    }
});

module.exports = blogRouter;
