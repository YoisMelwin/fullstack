const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

const app = express()

app.use(cors()) // Lägg till detta

const db = new sqlite3.Database(path.resolve(__dirname, 'fabrics.sqlite'))

app.get('/products', (_req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error(err.message)
            res.status(500).send('Database error')
            return
        }
        res.json(rows)
    })
})

app.use(express.static(path.join(path.resolve(), 'dist')))

app.get('*', (_req, res) => {
    res.sendFile(path.join(path.resolve(), 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('redo på http://localhost:3000')
})
