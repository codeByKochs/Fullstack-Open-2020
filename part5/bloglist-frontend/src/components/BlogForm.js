import React from 'react'

const BlogForm = ({user, setNewBlog, handleBlogChange, handleBlogCreation}) => {

    const newBlog = {
        title: "",
        author: "",
        url: ""
    }

    if (user !== null){
        return(
            <div>
                <h2>create new</h2>
                <form onSubmit={handleBlogCreation}>
                    <div>
                        title
                        <input
                            type="text"
                            value={newBlog.title}
                            onChange={() => {handleBlogChange(newBlog)}} 
                        />
                    </div>
                    <div>
                        author
                        <input
                            type="text"
                            value={newBlog.author}
                            onChange={() => {handleBlogChange(newBlog)}} 
                        />
                    </div>
                    <div>
                        url
                        <input
                            type="text"
                            value={newBlog.url}
                            onChange={() => {handleBlogChange(newBlog)}} 
                        />
                    </div>
                    <button type="submit">create</button>
                </form> 
            </div>
        )
    }
    return null;
}

export default BlogForm