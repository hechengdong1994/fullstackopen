const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs')
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const { name, username, password } = request.body

    if (username.length < 3) {
        return response.status(400).json({ error: 'username length at least 3' })
    }
    if (password.length < 3) {
        return response.status(400).json({ error: 'password length at least 3' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({ name, username, passwordHash })

    user
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = usersRouter