const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'Memory Game',
		author: 'giridhar7632',
		url: 'https://url/to/blog.com',
		likes: 2727,
	},
	{
		title: 'Flappy Bird',
		author: 'Giridhar',
		url: 'https://url/to/flappy.com',
		likes: 2376,
	},
]

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'Test Blog',
		author: 'Tester',
		url: 'https://test.com/url',
		likes: 547,
	})
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})

	return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb }
