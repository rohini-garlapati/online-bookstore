const mongoose = require('mongoose')
const bookschem = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availabity: {
      type: Boolean,
      required: true,
    },
  },
  {
    timeStamp: true,
  }
)

const book = mongoose.model('book', bookschem)
module.exports = book
//module.exports=bookschem;
