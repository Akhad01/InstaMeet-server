const { Schema, model } = require('mongoose')

const userScheme = new Schema(
  {
    name: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      require: true,
    },
    completedMeetings: Number,
    image: String,
    rate: Number,
    sex: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    profession: {
      type: Schema.Types.ObjectId,
      ref: 'Proffesion',
    },
    qualities: [{ type: Schema.Types.ObjectId, ref: 'Quality' }],
  },
  {
    timestamps: true,
  }
)

const Proffesion = model('User', userScheme)

module.exports = Proffesion
