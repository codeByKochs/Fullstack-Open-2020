const dummy = (blogs) => 1;

// returns total amount of likes for a given list of blogs
const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0;
    }

    const reducer = (accumulator, blog) => accumulator + blog.votes;
    return blogs.reduce(reducer, 0);
}

// returns highest voted blog of list of blogs
const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    let maxVotes = 0;
    let favouriteBlog = undefined;

    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].votes > maxVotes) {
            maxVotes = blogs[i].votes;            
            favouriteBlog = blogs[i];
        }
    }
    return {
        title: favouriteBlog.title,
        author: favouriteBlog.author,
        votes: favouriteBlog.votes,
    };
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0){
        return null;
    }

    let authors = new Map()
    let maxBlogs = 0;
    let maxBlogs_author = null;

    blogs.forEach(blog => {
        // if author is not in hashmap it is added with 0 blogs
        if (!authors.has(blog.author)) {
            authors.set(blog.author, 0)
        }
        authors.set(blog.author, (authors.get(blog.author) + 1))
    });

    for (let [author, blogs] of authors){
        if (blogs > maxBlogs){
            maxBlogs = blogs
            maxBlogs_author = author
        }
    }
    return {author: maxBlogs_author, blogs: maxBlogs}
}

const mostVotes = (blogs) => {
    if (blogs.length === 0){
        return null;
    }

    let authors = new Map()
    let maxVotes = 0;
    let maxVotes_author = null;

    blogs.forEach(blog => {
        // if author is not in hashmap it is added with 0 votes
        if (!authors.has(blog.author)) {
            authors.set(blog.author, 0)
        }
        authors.set(blog.author, (authors.get(blog.author) + blog.votes))
    });

    for (let [author, votes] of authors){
        if (votes > maxVotes){
            maxVotes = votes
            maxVotes_author = author
        }
    }
    return {author: maxVotes_author, votes: maxVotes}
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostVotes
};
