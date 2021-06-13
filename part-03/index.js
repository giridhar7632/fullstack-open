require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

let persons = [
	{
		name: 'Arto Hellas',
		number: '040-123456',
		id: 1,
	},
	{
		name: 'Ada Lovelace',
		number: '39-44-5323523',
		id: 2,
	},
	{
		name: 'Dan Abramov',
		number: '12-43-234345',
		id: 3,
	},
	{
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
		id: 4,
	},
]

app.get('/info', (_, res) => {
	let date = new Date().toUTCString()
	res.send(`Phonebook has total ${persons.length} by \n ${date}`)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.post('/api/persons', (req, res) => {
	const { name, number } = req.body
	if (!name || !number) return res.json({ error: 'Insufficient contents.' })

	const check = persons.find((person) => person.name === name)
	if (check) {
		return res.json({ error: 'Name already exists.' })
	} else {
		let id = Math.floor(Math.random() * 1000)
		let person = {
			name: name,
			number: number,
			id,
		}
		persons = persons.concat(person)
		return res.json(persons)
	}
})

app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id
	const person = persons.find((person) => person.id === parseInt(req.params.id))
	if (person) {
		return res.json(person)
	} else {
		return res.status(404).json({ msg: 'Not found' })
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id

	persons = persons.filter((person) => person.id !== parseInt(req.params.id))
	console.log(persons)
	return res.status(204).json(persons)
})

app.listen(port, () => console.log(`Server started running on port ${port} 🚀`))
