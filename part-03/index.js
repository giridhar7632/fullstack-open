require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person.model.js')

const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(express.static('build'))

// eslint-disable-next-line no-unused-vars
morgan.token('post', (req, _) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ''
  }
})
morgan.format(
  'logg',
  ':method :url :status :res[content-length] - :response-time ms :post'
)
app.use(morgan('logg'))

app.get('/info', async (_, res) => {
  let date = new Date().toUTCString()
  let persons = await Person.find({})
  res.send(`Phonebook has total ${persons.length} by \n ${date}`)
})

app.get('/api/persons', (_, res) => {
  Person.find({}).then((data) => {
    res.json(data)
  })
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) return res.json({ error: 'Insufficient contents.' })

  let newPerson = new Person({
    name: name,
    number: number,
  })
  newPerson
    .save()
    .then(() => res.json({ msg: 'Person added successfully' }))
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        return res.status(404).json({ msg: 'Not found' })
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  Person.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started running on port ${port} 🚀`))
