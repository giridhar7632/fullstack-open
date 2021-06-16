require('dotenv').config()

const PORT = process.env.PORT || 5000

const URI =
	process.env.NODE_ENV === 'test'
		? process.env.TEST_MONGO_URI
		: process.env.MONGO_URI

const SECRET = process.env.SECRET

module.exports = {
	URI,
	PORT,
	SECRET,
}
