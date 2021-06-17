/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleUpdate, handleDelete, user }) => {
	const { id, title, author, url, likes } = blog
	const [newLikes, setNewLikes] = useState(likes)
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}
	console.log(user)
	console.log(blog.user)

	const updateBlog = () => {
		setNewLikes(newLikes + 1)
		handleUpdate(id, {
			user: blog.user._id,
			likes: newLikes,
			author: author,
			title: title,
			url: url,
		})
	}

	const deleteBlog = () => {
		if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
			handleDelete(id)
		}
	}

	return (
		<div className='blog' style={blogStyle}>
			{title} —
			<div className='showWhenVisible'>
				<Togglable buttonLabel='view'>
					{url}
					<br />
					{newLikes}{' '}
					<button className='like-btn' onClick={updateBlog}>
						like
					</button>
					<br />
					{author}
				</Togglable>
				{user.username === blog.user.username && (
					<button className='remove' onClick={deleteBlog}>
						remove
					</button>
				)}
			</div>
		</div>
	)
}

export default Blog
