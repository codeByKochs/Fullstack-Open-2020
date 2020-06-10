const blogRouter = require('express').Router();
const Blog = require('../models/blogModel');

// handles request of blog database
blogRouter.get('/', (request, response) => {
    Blog.find({})
        .then((blogs) => {
            response.json(blogs.map((blog) => blog.toJSON()));
        });
});

// handles request for specific blog identified by ID
blogRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then((blog) => {
            if (blog) {
                response.json(blog.toJSON());
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});

// handles post request of new blog
blogRouter.post('/', (request, response, next) => {
    const blog = new Blog({
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        votes: request.body.votes,
    });

    blog.save()
        .then((savedBlog) => {
            response.json(savedBlog.toJSON());
        })
        .catch((error) => next(error));
});

// handles deletion of blog
blogRouter.delete('/:id', (request, response, next) => {
    Blog.findOneAndRemove(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

blogRouter.put('/:id', (request, response, next) => {
    const blog = new Blog({
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        votes: request.body.votes,
    });

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then((updatedBlog) => {
            response.json(updatedBlog.toJSON());
        })
        .catch((error) => next(error));
});

module.exports = blogRouter;
