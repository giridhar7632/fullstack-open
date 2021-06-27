import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog tests', () => {
  const blog = {
    _id: '5a43fde2cbd20b12a2c34e91',
    user: {
      _id: '5a43e6b6c37f3d065eaaa581',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    },
    likes: 0,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
  }

  test('renders title', () => {
    const component = render(<Blog blog={blog} />)
    const button = component.container.querySelector('button')
    console.log(prettyDOM(button))
    expect(component.container).toHaveTextContent(
      'The Joel Test: 12 Steps to Better Code'
    )
  })

  test('renders url, likes and author after view button clicked', () => {
    const component = render(<Blog blog={blog} />)
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    expect(component.container).toHaveTextContent(
      blog.url,
      blog.likes.toString(),
      blog.author
    )
  })

  test('if the like button is clicked twice', () => {
    const mockHandler = jest.fn()
    const component = render(<Blog blog={blog} handleUpdate={mockHandler} />)
    const view = component.getByText('view')
    const like = component.getByText('like')

    fireEvent.click(view)
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
