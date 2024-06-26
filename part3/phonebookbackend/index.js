const express = require('express')

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const app = express()
app.use(express.json())
const morgan = require('morgan')
// app.use(morgan('tiny'))
// 定义token
morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
// 在日志内容中调用token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// app.use(morgan(function (tokens, req, res) {
//     return [
//         tokens.method(req, res),
//         tokens.url(req, res),
//         tokens.status(req, res),
//         tokens.res(req, res, 'content-length'),
//         '-',
//         tokens['response-time'](req, res), 'ms',
//         JSON.stringify(req.body)//tokens.body(req, res)
//     ].join(' ')
// }))

app.get('', (request, response) => {
    response.end('Hello World')
})
app.get('/info', (request, response) => {
    response
        .contentType('text/html')
        .end(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toISOString()} </p>`)
})


// app.use(express.json())
app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name || !person.number) {
        return response.status(400).json({ error: 'name and number are required' }).end()
    }
    if (persons.find(p => p.name === person.name)) {
        return response.status(400).json({ error: 'name must be unique' }).end()
    }

    person.id = Math.floor(Math.random() * 100);

    persons = persons.concat(person)

    return response.status(201).json(person).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)