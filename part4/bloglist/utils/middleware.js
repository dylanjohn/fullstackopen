const logger = require('./logger')
const morgan = require('morgan')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// Configure morgan token
morgan.token('req-body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return '-'
})

// Create morgan middleware instance
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :req-body')

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  morganLogger
}