import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('BlogForm', () => {
  test('loads input correctly', () => {
    const mockHandler = jest.fn()

    const component = render(
      <BlogForm createBlog={mockHandler}/>
    )

    const form = component.container.querySelector('form')

    const titleInput = component.container.querySelector('.title')
    const authorInput = component.container.querySelector('.author')
    const urlInput = component.container.querySelector('.url')

    fireEvent.change(titleInput, { target: { value: 'testTitle' }})
    fireEvent.change(authorInput, { target: { value: 'testAuthor' }})
    fireEvent.change(urlInput, { target: { value: 'testUrl' }})

    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0]).toEqual([ { title: 'testTitle', author: 'testAuthor', url: 'testUrl' } ])
  })


})
