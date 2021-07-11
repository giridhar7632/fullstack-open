const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (
    body.title === undefined ||
    body.url === undefined ||
    body.title === '' ||
    body.url === ''
  ) {
    response.status(400).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  }
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Unauthorized to delete this blog' })
  }
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() === blog.user.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    )

    response.json(updatedBlog)
  } else {
    response.status(401).json({ error: 'Unauthorized to delete this blog' })
  }
})

blogRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const { comment } = request.body

  if (!comment || comment === '') {
    return response.status(400).json({ error: 'No comment 😅' }).end()
  }

  const reqBlog = await Blog.findById(request.params.id)
  reqBlog.comments.push(comment)
  await reqBlog.save()
  response.json(reqBlog)
})

module.exports = blogRouter
