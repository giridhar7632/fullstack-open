require('dotenv').config()

const PORT = process.env.PORT || 5000
const URI = process.env.MONGO_URI

module.exports = {
	URI,
	PORT,
}
