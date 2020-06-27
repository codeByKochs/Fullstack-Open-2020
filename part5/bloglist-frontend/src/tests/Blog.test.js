import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'


describe('blog', () => {
  test('by default only renders title and author', () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      votes: 0,
      user: {
        name: 'TestName'
      }
    }
    const component = render(<Blog blog={blog}/>)

    expect(component.container).toHaveTextContent(
      blog.title, blog.author
    )
    expect(component.container).not.toHaveTextContent(
      blog.url, blog.user.name
    )
  })

  test('shows url, number of votes, when view button is clicked', () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      votes: 0,
      user: {
        name: 'TestName'
      }
    }

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url, blog.votes, blog.user.name)
  })

  test('if like button is clicked twice, the event handler the component receives as props is called twice', () => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      votes: 0,
      user: {
        name: 'TestName'
      }
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )


    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
