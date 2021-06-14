const mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')

// connecting to mongodb atlas
const uri = process.env.MONGO_URI
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connection is established successfully 🎉'))
  .catch((err) => console.log(err))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Name must have atleast 3 characters'],
  },
  number: {
    type: String,
    required: true,
    minlength: [8, 'Number must have atleast 8 characters'],
  },
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
