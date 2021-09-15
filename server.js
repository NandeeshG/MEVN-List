try {
    const dotenv = require('dotenv')
    dotenv.config()
} catch (e) {
    console.log(e)
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bli = require('./routes/api/bucketListItem')
const app = express()
require('./mongo')
const path = require('path')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/bucketListItems', bli)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(process.env.SERVER_PORT, () =>
    console.log(
        `Express listening at http://localhost:${process.env.SERVER_PORT}`
    )
)
