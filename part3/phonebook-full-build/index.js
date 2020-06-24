require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

const PORT = process.env.PORT || 3001


// middleware definitions
morgan.token('body', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
})


app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



// request handling
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res, next) => {
    let today = new Date()
    Person.estimatedDocumentCount()
        .then(numberOfPersons => {
            res.send(`<p>Phonebook has info for ${numberOfPersons} people</p>
                <p>${today}</p>`)
        })
        .catch(error => {next(error)})
})

// handles request for a single entry in database (identified by its ID)
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(foundPerson => {
            if (foundPerson) {
                res.json(foundPerson)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => { next(error) })
})

// handles request for whole database
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

// handles deletion of entry of database (identified by ID)
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

// handles addition of new entrys to database
app.post('/api/persons', (req, res, next) => {

    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name is missing'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'number is missing'
        })
    }

    const newPerson = new Person({
        name : body.name,
        number : body.number,
    })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findOneAndUpdate({ _id: req.params.id }, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

// error handlers
const errorHandler = (error, request, response , next) => {
    console.error(error.message)

    if (error.name === 'CastError'){
        return response.status(400).send({ error: 'malformed id' })
    }

    if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})