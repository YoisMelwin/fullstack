const express = require('express'),
    path = require('path')
const sqlite3 = require('sqlite3').verbose()

const app = express()

//öppna anslutning till DB
const db = new sqlite3.Database(path.resolve(__dirname, 'testk.sqlite'))

/* app.get('/api', (_request, result) => {
    result.send({ hello: 'world' })
}) */

//endpoint för att hämta all data från databasen

app.get('/cities', (_req, res) => {
    db.all('SELECT * FROM cities', (err, rows) => {
        if (err) {
            console.error(err.message)
            res.status(500).send('Database error')
            return
        }
        res.json(rows)
    })
})

//Nedanför lägger vi flera endpoints.

//Middelware för att läsa statiska filer med express från mappen dist
app.use(express.static(path.join(path.resolve(), 'dist')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('redo på http://localhost:3000')
})
