const { Schema, model } = require('mongoose')

const qualityScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Quality = model('Quality', qualityScheme)

module.exports = Quality
