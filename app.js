const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('config')

const app = express()

const PORT = config.get('port') ?? 8080

app.listen(PORT, () => {
  console.log(chalk.green(`Server has been started on port ${PORT}...`))
})
