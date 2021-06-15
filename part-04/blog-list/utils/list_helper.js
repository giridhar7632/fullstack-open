const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}
const favoriteBlog = (blogs) => {
	let isMax = 0
	let i = 0
	blogs.forEach((blog) => {
		if (blog.likes > isMax) {
			isMax = blog.likes
			i = blogs.index(blog)
		}
	})
	return blogs[i]
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) return 0
	let sum = 0
	blogs.forEach((e) => {
		sum += e.likes
	})
	return sum
}

function mostiteratee(blog) {
	return blog.author
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return {}
	}
	const groupedBlogs = _.groupBy(blogs, mostiteratee)
	const blogsByLikes = _.mapValues(groupedBlogs, totalLikes)
	const mostLikedAuthor = Object.entries(blogsByLikes).reduce((a, b) =>
		a[1] > b[1] ? a : b
	)
	return { author: mostLikedAuthor[0], likes: mostLikedAuthor[1] }
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return {}
	}
	const groupedBlogs = _.groupBy(blogs, mostiteratee)
	const blogsByAuthors = _.mapValues(groupedBlogs, (o) => o.length)
	const mostBlog = Object.entries(blogsByAuthors).reduce((a, b) =>
		a[1] > b[1] ? a : b
	)
	return { author: mostBlog[0], blogs: mostBlog[1] }
}
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostLikes,
	mostBlogs,
}
