const { Schema, model } = require('mongoose')

const professionScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Proffesion = model('Proffesion', professionScheme)

module.exports = Proffesion
