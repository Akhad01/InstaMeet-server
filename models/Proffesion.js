const { Schema, model } = require('mongoose')

const professionsScheme = new Schema(
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

const Proffesion = model('Proffesion', professionsScheme)

module.exports = Proffesion
