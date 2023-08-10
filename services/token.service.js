const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
  // return: accessToken, refreshToken, expiresIn
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecret'), {
      expiresIn: '1h',
    })

    const refreshToken = jwt.sign(payload, config.get('refreshSecret'))
    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
    }
  }

  async save(userId, refreshToken) {
    const data = await Token.findOne({ userId })

    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }

    const token = await Token.create({ userId, refreshToken })

    return token
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshSecret'))
    } catch (error) {
      return null
    }
  }

  validateAccess(accessToken) {
    try {
      console.log('jwt', config.get('accessSecret'))

      return jwt.verify(accessToken, config.get('accessSecret'))
    } catch (error) {
      console.log('error', error.message)

      return null
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken })
    } catch (error) {
      return null
    }
  }
}

module.exports = new TokenService()
