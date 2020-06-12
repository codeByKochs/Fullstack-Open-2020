const listHelper = require('../utils/list_helper');

const blogs = [{
    _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', votes: 7, __v: 0,
},
{
    _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', votes: 5, __v: 0,
},
{
    _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', votes: 12, __v: 0,
},
{
    _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', votes: 10, __v: 0,
},
{
    _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', votes: 0, __v: 0,
},
{
    _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', votes: 2, __v: 0,
},
];

test('dummy returns one', () => {
    expect(listHelper.dummy([])).toBe(1);
});

describe('total likes(votes)', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0);
    });
    test('when list is only one blog equals the likes of that', () => {
        expect(listHelper.totalLikes([blogs[0]])).toBe(7);
    });
    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36);
    });
});

describe('favourite blog', () => {
    test('of empty list is null', () => {
        expect(listHelper.favouriteBlog([])).toBe(null);
    });
    test('of list is only one blog equals the likes of that', () => {
        expect(listHelper.favouriteBlog([blogs[0]])).toEqual({title: 'React patterns', author: 'Michael Chan', votes: 7});
    });
    test('of bigger list is correct blog', () => {
        expect(listHelper.favouriteBlog(blogs)).toEqual({title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', votes: 12});
    });
});

describe('most blogs', () => {
    test('of empty list is null', () => {
        expect(listHelper.mostBlogs([])).toEqual(null);
    });
    test('of list consisting of one blog equals one author', () => {
        expect(listHelper.mostBlogs([blogs[0]])).toEqual({author: 'Michael Chan', blogs: 1});
    })
    test('of bigger list is correct author', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual({author: 'Robert C. Martin', blogs: 3});
    });
})


describe('most votes', () => {
    test('of empty list is null', () => {
        expect(listHelper.mostVotes([])).toEqual(null);
    });
    test('of list consisting of one blog equals one author', () => {
        expect(listHelper.mostVotes([blogs[0]])).toEqual({author: 'Michael Chan', votes: 7});
    })
    test('of bigger list is correct author', () => {
        expect(listHelper.mostVotes(blogs)).toEqual({author: 'Edsger W. Dijkstra', votes: 17});
    });
})