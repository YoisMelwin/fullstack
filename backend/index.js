const express = require('express'),
    path = require('path')

const app = express()

app.get('/api', (_request, result) => {
    result.send({ hello: 'world' })
})

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(3000, () => {
    console.log('redo på http://localhost:3000')
})
