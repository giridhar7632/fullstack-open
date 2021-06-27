import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const inputLikes = component.container.querySelector('#likes')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'Title' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Author' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'url.com' }
  })
  fireEvent.change(inputLikes, {
    target: { value: 9378 }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Author')
  expect(createBlog.mock.calls[0][0].url).toBe('url.com')
  expect(parseInt(createBlog.mock.calls[0][0].likes)).toBe(9378)
})
