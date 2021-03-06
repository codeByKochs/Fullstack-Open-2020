const logger = require('./logger');

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path: ', request.path);
    logger.info('Body: ', request.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token = authorization.substring(7)
    }
    next();
}

const errorHandler = (error, request, response, next) => {
    console.log('error.message: ', error.message);

    switch (error.name) {
    case 'CastError':
        return response.status(400).send({ error: 'malformatted id' });

    case 'ValidationError':
        return response.status(400).send({ error: error.message });

    case 'JsonWebTokenError':
        return response.status(401).json({ error: 'invalid token'})

    default:
        next(error);
    }
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    tokenExtractor,
    errorHandler,
};
