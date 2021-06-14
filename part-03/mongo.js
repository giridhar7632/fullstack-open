const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an argument: node mongo.js <password>'
	)
	process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://Giridhar:${password}@cluster0.urs4y.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

const noteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		default: 'No name',
	},
	number: {
		type: String,
		required: true,
	},
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv[3] && process.argv[4]) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then((result) => {
		console.log(`added ${result.name} number ${result.number} to phonebook`)
		mongoose.connection.close()
	})
} else {
	Person.find({}).then((result) => {
		console.log('Phonebook')
		result.forEach((person) => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})
}
