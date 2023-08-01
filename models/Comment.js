const { Schema, model } = require('mongoose')

const commentScheme = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // На чьей странице находтся комментарий
    pageId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Кто оставил комент
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
)

const Comment = model('Comment', commentScheme)

module.exports = Comment
