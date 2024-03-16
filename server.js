const mongoose = require('mongoose')
const express = require('express')
const Book = require('./models/bookstoremodels.js')
const app = express()

// const cors = require('cors')

// app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/addbook', async (req, res) => {
  try {
    const book = await Book.create(req.body)
    res.status(201).json(book)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
})
app.get('/getbooks', async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
})
app.delete('/deletebook/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
      res.status(404).json({ message: 'Book not found ${id}' })
    }
    res.status(200).json(book)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
})
app.put('/updatebook/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body)
    if (!book) {
      res.status(404).json({ message: 'Book not found ${id}' })
    }
    const updatebook = await Book.findById(req.params.id)
    res.status(200).json(updatebook)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
})

mongoose.set('strictQuery', false)

mongoose
  .connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to local MongoDB')
    app.listen(3001, () => {
      console.log(`Node API app is running on port 3001`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to local MongoDB:', error)
  })
