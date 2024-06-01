const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // // this ensures the uniqueness of username
    },
    name: String,
    passwordHash: String,
    notes: [
        // 笔记的id以Mongo id数组的形式存储在用户文档中。
        {
            // 该字段的类型是ObjectId，引用note文档。
            // Mongo 本身并不知道这是一个引用笔记的字段，这个语法纯粹是与 Mongoose 有关，并由 Mongoose 定义。
            type: mongoose.Schema.Types.ObjectId,
            res: 'Note'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)