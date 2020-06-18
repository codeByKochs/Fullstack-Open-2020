const blogRouter = require('express').Router();
const Blog = require('../models/blogModel');

// handles request of blog database
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map((blog) => blog.toJSON()));
});

// handles request for specific blog identified by ID
blogRouter.get('/:id', async (request, response) => {
    blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON());
    } else {
        response.status(404).end();
    }
});

// handles post request of new blog
blogRouter.post('/', async (request, response) => {

    if (!request.body.title || !request.body.url){
        response.status(400).json({error: "missing title or url"})
    } else {
        const blog = new Blog({
            author: request.body.author,
            title: request.body.title,
            url: request.body.url,
            votes: request.body.votes,
        });
        
        const savedBlog = await blog.save();
        response.json(savedBlog.toJSON())
    }
});

// handles deletion of blog
blogRouter.delete('/:id', async (request, response) => {
    await Blog.findOneAndRemove(request.params.id)
    response.status(204).end();
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
