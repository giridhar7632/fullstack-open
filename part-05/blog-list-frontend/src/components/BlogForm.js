import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState()
	const [author, setAuthor] = useState()
	const [url, setUrl] = useState()
	const [likes, setLikes] = useState()

	const handleSubmit = (e) => {
		e.preventDefault()
		createBlog({
			title,
			author,
			url,
			likes,
		})
		setTitle('')
		setLikes('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>Create a Blog</h2>

			<form onSubmit={handleSubmit}>
				<div>
					title:
					<input
						type='text'
						value={title}
						name='title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						type='text'
						value={author}
						name='author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						type='text'
						value={url}
						name='url'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<div>
					likes:
					<input
						type='number'
						value={likes}
						name='likes'
						onChange={({ target }) => setLikes(target.value)}
					/>
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
}

export default BlogForm
