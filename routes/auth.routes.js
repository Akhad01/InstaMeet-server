const express = require('express')

const router = express.Router({ mergeParams: true })

router.post('/signUp', async (req, res) => {})
router.post('/signInWithPassword', () => {})
router.post('/token', () => {})

module.exports = router
