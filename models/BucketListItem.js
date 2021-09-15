const { Schema, model } = require('mongoose')

const schema = Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const itemModel = model('bucketListItem', schema)

module.exports = itemModel
