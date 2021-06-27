const mongoose = require('mongoose')
const supertest = require('supertest')
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(initialBlogs)
	})

	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('id of blog to be defined', async () => {
		const response = await api.get('/api/blogs')
		response.body.forEach((r) => expect(r.id).toBeDefined())
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialBlogs.length)
	})

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const titles = response.body.map((r) => r.title)

		expect(titles).toContain('Memory Game')
	})
})

describe('viewing a specific blog', () => {
	test('succeeds with a valid id', async () => {
		const blogsAtStart = await blogsInDb()
		const blogToView = blogsAtStart[0]

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

		expect(resultBlog.body).toEqual(processedBlogToView)
	})

	test('fails with statuscode 404 if blog does not exist', async () => {
		const validNonexistingId = nonExistingId()
		console.log(validNonexistingId)

		await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
	})

	test('fails with statuscode 400 id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445'

		await api.get(`/api/notes/${invalidId}`).expect(400)
	})
})

describe('addition of a new blog', () => {
	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'Valid blog',
			author: 'validator',
			url: 'https://url/to/the/blog.com',
			likes: 0,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

		const titles = blogsAtEnd.map((n) => n.title)
		expect(titles).toContain('Valid blog')
	})

	test('if likes are undefined initialize it to 0', async () => {
		const newBlog = {
			title: 'Like blog',
			author: 'liker',
			url: 'https://likes.com/liker',
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd[2].likes).toBe(0)
	})

	test('fails with status code 400 if title or url invaild', async () => {
		const newBlog = { author: 'noTitle' }

		await api.post('/api/blogs').send(newBlog).expect(400)

		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd).toHaveLength(initialBlogs.length)
	})
})

describe('deletion of a blog', () => {
	test('a blog can be deleted', async () => {
		const blogsAtStart = await blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

		const blogsAtEnd = await blogsInDb()

		expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

		const titles = blogsAtEnd.map((r) => r.title)

		expect(titles).not.toContain(blogToDelete.title)
	})
})

describe('updating a specific blog', async () => {
	const blogsAtStart = await blogsInDb()
	const likesAtStart = blogsAtStart[0].likes
	const blogToUpdate = blogsAtStart[0]
	blogToUpdate.likes += 1

	await api
		.put(`/api/blogs/${blogsAtStart[0].id}`)
		.send(blogToUpdate)
		.expect(200)

	expect(likesAtStart + 1).toBe(blogToUpdate.likes)
})

afterAll(() => {
	mongoose.connection.close()
})
