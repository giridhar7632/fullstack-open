const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middlerware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
require('express-async-errors')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

mongoose.connect(config.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

app.use('/api/blogs', blogRouter)
app.use(middlerware.unknownEndpoint)
app.use(middlerware.errorHandler)

module.exports = app
