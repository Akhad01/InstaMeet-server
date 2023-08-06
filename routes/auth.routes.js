const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const { generateUserData } = require('../utils/helpers')
const tokenService = require('../services/token.service')
const router = express.Router({ mergeParams: true })

// /api/auth/signUp
// 1) get data from req (email, password ...)
// 2) check if user already exists
// 3) hash password
// 4) create user
// 5) generate tokens

router.post('/signUp', [
  check('email', 'Your email is not valid').isEmail(),
  check('password', 'Your password must be at least 8 characters').isLength({
    min: 8,
  }),

  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array(),
          },
        })
      }

      const { email, password } = req.body

      const existingUser = await User.findOne({ email })

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400,
          },
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      })

      const tokens = tokenService.generate({ _id: newUser._id })

      await tokenService.save(newUser._id, tokens.refreshToken)

      res.status(201).send({ ...tokens, userId: newUser._id })
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже',
      })
    }
  },
])
router.post('/signInWithPassword', () => {})
router.post('/token', () => {})

module.exports = router
