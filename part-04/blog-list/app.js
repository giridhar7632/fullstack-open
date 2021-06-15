const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middlerware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

mongoose
	.connect(config.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => logger.info('Connected to MongoDB 🎉'))

app.use('/api/blogs', blogRouter)
app.use(middlerware.unknownEndpoint)
app.use(middlerware.errorHandler)

module.exports = app
