/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleUpdate, handleDelete }) => {
	const { id, title, author, user, url, likes } = blog
	const [newLikes, setNewLikes] = useState(likes)
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const updateBlog = () => {
		setNewLikes(newLikes + 1)
		handleUpdate(id, {
			user: user._id,
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
			<Togglable buttonLabel='view'>
				{url}
				<br />
				{newLikes} <button onClick={updateBlog}>like</button>
				<br />
				{author}
			</Togglable>
			{user.username && <button onClick={deleteBlog}>remove</button>}
		</div>
	)
}

export default Blog
