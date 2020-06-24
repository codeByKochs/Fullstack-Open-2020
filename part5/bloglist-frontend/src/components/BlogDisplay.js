import React from 'react'
import Blog from './Blog'

const Blogdisplay = ({user, blogs}) => {
    if (user === null){
        return null
    } else {
        return(
            <div>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </div>
        )
    }
}

export default Blogdisplay